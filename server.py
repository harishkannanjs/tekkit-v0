#!/usr/bin/env python3
"""
Simple HTTP server to serve static files for the RareSkills website.
Configured for Replit environment to serve on 0.0.0.0:5000.
"""
import http.server
import socketserver
import os

# Set the port and host for Replit environment
PORT = 5000
HOST = "0.0.0.0"

# Change to the directory containing our static files - serve from dist if it exists
if os.path.exists("dist"):
    os.chdir("dist")
    print("Serving from dist directory (TypeScript build)")
else:
    os.chdir(".")
    print("Serving from root directory")

# Create handler for serving static files
Handler = http.server.SimpleHTTPRequestHandler

# Add proper cache control headers to prevent caching issues
class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add cache control headers to prevent caching issues in Replit iframe
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer((HOST, PORT), NoCacheHTTPRequestHandler) as httpd:
        print(f"Server running at http://{HOST}:{PORT}/")
        print("Serving static files from current directory")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")