# WEB404_assignment1

## Web Server Vulnerability Assessment Using Nikto

A WEB404 Secure Coding Practices practical using Nikto to scan for missing security headers, outdated software, and exposed files on a web server.

The originally assigned target, `testphp.vulnweb.com`, was found to be down during testing (confirmed unreachable from two machines). A sibling Acunetix test site, `testaspnet.vulnweb.com`, was scanned instead, but the scan was stopped after 15 minutes as a deliberate time-box, having already surfaced 13 partial findings. The full, formally analysed results come from a purpose-built local Express app (`fallback-app/`) that reproduces the same classes of weakness under full control, including a high-severity exposed backup file that Nikto caught, and a second, differently named backup file that it missed, a good illustration of the limits of signature-based scanning.

See `report.md` for the full writeup: methodology, findings table, per-finding analysis, and remediation.
