#  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
#  ┃ ██████ ██████ ██████       █      █      █      █      █ █▄  ▀███ █       ┃
#  ┃ ▄▄▄▄▄█ █▄▄▄▄▄ ▄▄▄▄▄█  ▀▀▀▀▀█▀▀▀▀▀ █ ▀▀▀▀▀█ ████████▌▐███ ███▄  ▀█ █ ▀▀▀▀▀ ┃
#  ┃ █▀▀▀▀▀ █▀▀▀▀▀ █▀██▀▀ ▄▄▄▄▄ █ ▄▄▄▄▄█ ▄▄▄▄▄█ ████████▌▐███ █████▄   █ ▄▄▄▄▄ ┃
#  ┃ █      ██████ █  ▀█▄       █ ██████      █      ███▌▐███ ███████▄ █       ┃
#  ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
#  ┃ Copyright (c) 2017, the Perspective Authors.                              ┃
#  ┃ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ ┃
#  ┃ This file is part of the Perspective library, distributed under the terms ┃
#  ┃ of the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). ┃
#  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import asyncio
import perspective


class PerspectiveStarletteHandler(object):
    """`PerspectiveStarletteHandler` is a drop-in implementation of Perspective.

    # Examples

    >>> server = Server()
    >>> client = server.client()
    >>> client.table(pd.read_csv("superstore.csv"), name="data_source_one")
    >>> app = FastAPI()
    >>> async def endpoint(websocket: Websocket):
    ...     handler = PerspectiveStarletteHandler(server, websocket)
    ...     await handler.run()
    ... app.add_api_websocket_route('/websocket', endpoint)
    """

    def __init__(self, **kwargs):
        self._server = kwargs.pop("perspective_server", perspective.GLOBAL_SERVER)
        self._websocket = kwargs.pop("websocket")
        self._executor = kwargs.pop("executor", None)
        self._loop = kwargs.pop("loop", asyncio.get_event_loop())
        super().__init__(**kwargs)

    async def run(self) -> None:
        def inner(msg):
            self._loop.create_task(self._websocket.send_bytes(msg))

        self.session = self._server.new_session(inner)

        try:
            await self._websocket.accept()
            while True:
                message = await self._websocket.receive()
                self._websocket._raise_on_disconnect(message)
                if self._executor is not None:
                    self._executor.submit(self.session.handle_request, message["bytes"])
                else:
                    self.session.handle_request(message["bytes"])
        finally:
            self.session.close()
