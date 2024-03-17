var { exec } = require("child_process")


module.exports.use = function setting(name) {
    var py = exec(`python ess.py ${name}`, function (err, stdout, stderr) {
        console.log(stdout)

    })

    // py.stdout.pipe(process.stdout)
    // process.stdin.pipe(py.stdin)

}