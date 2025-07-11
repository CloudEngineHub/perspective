// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
// ┃ ██████ ██████ ██████       █      █      █      █      █ █▄  ▀███ █       ┃
// ┃ ▄▄▄▄▄█ █▄▄▄▄▄ ▄▄▄▄▄█  ▀▀▀▀▀█▀▀▀▀▀ █ ▀▀▀▀▀█ ████████▌▐███ ███▄  ▀█ █ ▀▀▀▀▀ ┃
// ┃ █▀▀▀▀▀ █▀▀▀▀▀ █▀██▀▀ ▄▄▄▄▄ █ ▄▄▄▄▄█ ▄▄▄▄▄█ ████████▌▐███ █████▄   █ ▄▄▄▄▄ ┃
// ┃ █      ██████ █  ▀█▄       █ ██████      █      ███▌▐███ ███████▄ █       ┃
// ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
// ┃ Copyright (c) 2017, the Perspective Authors.                              ┃
// ┃ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ ┃
// ┃ This file is part of the Perspective library, distributed under the terms ┃
// ┃ of the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). ┃
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

use std::path::Path;
use std::process::{Command, exit};

use clap::*;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
struct BundleArgs {
    /// Artifact name
    artifact: String,

    /// Compile in release mode?
    #[arg(short, long)]
    release: bool,

    /// Extra features to build with
    #[arg(long)]
    features: Option<String>,
}

use wasm_bindgen_cli_support::{Bindgen, EncodeInto};
use wasm_opt::{Feature, OptimizationOptions};

/// Run the packages `build` task with the appropriate flags. These can't be
/// defined in the `/.cargo/config.toml` because they would define this build
/// script's parameters also, and there is no way to reset e.g. the `target`
/// field to the host platform.
fn build(pkg: Option<&str>, is_release: bool, features: Vec<String>) {
    let features = format!("tracing/release_max_level_warn,{}", features.join(","));
    let mut cmd = Command::new("cargo");
    cmd.args(["build"])
        .args(["--lib"])
        .args(["--features", &features])
        .args(["--target", "wasm32-unknown-unknown"])
        .args(["-Z", "build-std=std,panic_abort"])
        .args(["-Z", "build-std-features=panic_immediate_abort"]);

    if is_release {
        cmd.args(["--release"]);
    }

    if let Some(pkg) = pkg {
        cmd.args(["-p", pkg]);
    }

    cmd.execute()
}

/// Generate the `wasm-bindgen` JavaScript and WASM bindings.
fn bindgen(outdir: &Path, artifact: &str, is_release: bool) {
    let input = Path::new("../target/wasm32-unknown-unknown")
        .join(if is_release { "release" } else { "debug" })
        .join(format!("{artifact}.wasm"));

    Bindgen::new()
        .web(true)
        .unwrap()
        .keep_debug(!is_release)
        .input_path(input)
        .encode_into(EncodeInto::Always)
        .typescript(true)
        // .reference_types(true)
        .out_name(&format!("{}.wasm", artifact.replace('_', "-")))
        .generate(outdir)
        .unwrap();
}

/// Run `wasm-opt` and output the new binary on top of the old one.
fn opt(outpath: &Path, is_release: bool) {
    if is_release {
        OptimizationOptions::new_optimize_for_size_aggressively()
            .enable_feature(Feature::BulkMemory)
            .enable_feature(Feature::ReferenceTypes)
            .enable_feature(Feature::Simd)
            .enable_feature(Feature::RelaxedSimd)
            .enable_feature(Feature::TruncSat)
            .run(outpath, outpath)
            .unwrap();
    }
}

fn main() {
    let args = BundleArgs::parse();
    let outdir = Path::new("dist/wasm");
    let is_release = args.release;
    let package = args.artifact.clone().replace('_', "-");
    let outpath = &Path::new(outdir).join(format!(
        "{}.wasm",
        args.artifact.replace("-js", "").replace('_', "-")
    ));

    let features = args
        .features
        .unwrap_or_default()
        .split(',')
        .map(|x| x.to_string())
        .collect();

    build(Some(package.as_str()), is_release, features);
    bindgen(outdir, args.artifact.as_str(), is_release);
    opt(outpath, is_release);
}

trait SimpleCommand {
    fn execute(&mut self);
}

impl SimpleCommand for Command {
    fn execute(&mut self) {
        match self.status().ok().and_then(|x| x.code()) {
            Some(0) => (),
            Some(x) => exit(x),
            None => exit(1),
        }
    }
}
