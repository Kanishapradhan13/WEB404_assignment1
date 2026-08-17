// Deliberately insecure Express app for local Nikto scanning practice.
// It intentionally skips security headers and exposes a backup file.
// Do not deploy this outside localhost.

const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Intentionally left on: leaks "X-Powered-By: Express" in every response.
// (A hardened app would call app.disable("x-powered-by").)

app.get("/", (req, res) => {
  res.send(`
    <h1>WEB404 Fallback Test Site</h1>
    <p>Deliberately insecure Express app for local Nikto scanning.</p>
    <ul>
      <li><a href="/login">/login</a></li>
      <li><a href="/config.php.bak">/config.php.bak</a> (exposed backup file)</li>
    </ul>
  `);
});

app.get("/login", (req, res) => {
  res.send("<h1>Login</h1><form><input name='user'><input name='pass' type='password'></form>");
});

// Deliberately exposed backup file containing "leaked" credentials.
// Served under two names: one arbitrary (shows a scanner's dictionary limits),
// one matching Nikto's known-filename signature list (shows a live detection).
app.get("/config.php.bak", (req, res) => {
  res.type("text/plain").send(
    "<?php\n// backup config - should never be web-accessible\n$db_host = 'localhost';\n$db_user = 'admin';\n$db_pass = 'changeme123';\n?>"
  );
});

app.get("/httpd.conf.bak", (req, res) => {
  res.type("text/plain").send(
    "# Apache httpd.conf configuration file (backup)\nServerRoot \"/etc/apache2\"\nListen 80\nDocumentRoot \"/var/www/html\"\n# NOTE: this is a deliberately leaked backup for coursework demonstration\n"
  );
});

app.listen(PORT, () => {
  console.log(`Fallback vulnerable app listening on http://localhost:${PORT}`);
});
