import http.server
import os

ROOT = os.path.dirname(os.path.abspath(__file__))

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        result = super().translate_path(path)
        if not os.path.exists(result) and not result.endswith('.html'):
            html_result = result.rstrip('/') + '.html'
            if os.path.isfile(html_result):
                return html_result
        return result

if __name__ == '__main__':
    http.server.test(HandlerClass=CleanURLHandler, port=8080)
