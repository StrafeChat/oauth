curl -X POST http://localhost:3000/token -d "code=test&grant_type=all&redirect_uri=localhost&client_id=dev&client_secret=strafe"
{"success":"success","body":{"token":"todo"}}

# TODO: shorten secrets
# client secret: 5496631edea02f0eccad98c5d3fb96ad3a786e6a00e1bdb4ca28d68cee0cfb9db0207424dce417ceeed2391e40e946dfe781562817ed1c1ad183b77d24fefa75
