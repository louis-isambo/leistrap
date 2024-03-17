(function () {
    "use strict";

    const allcom = leistrap.P({ attr: { className: ["p"] }, content: [leistrap.H3({ text: "All inputs Component" })] })
    const p = leistrap.P({ attr: { className: ["p"] }, content: [leistrap.H3({ text: "CheckBox Component" })] })
    const h = leistrap.P({ attr: { className: ["p"] }, content: [leistrap.H3({ text: "Radio Buttons Component" })] })
    const t = leistrap.P({ attr: { className: ["p"] }, content: [leistrap.H3({ text: "TextBox Component" })] })
    const s = leistrap.P({ attr: { className: ["p"] }, content: [leistrap.H3({ text: "SwitchBox Component" })] })
    const pass = leistrap.P({ attr: { className: ["p"] }, content: [leistrap.H3({ text: "Password Component" })] })
    const e = leistrap.P({ attr: { className: ["p"] }, content: [leistrap.H3({ text: "Email Component" })] })
    const inputs = leistrap.Input()


    const checkBox = inputs.getCheckBox()
    const name = checkBox.add("name", "name")
    const n = checkBox.add("sexe", "sexe")

    const radioBtns = inputs.getRadio()
    radioBtns.add("selective")
    radioBtns.add("operation")
    radioBtns.add("new radio", "louis")

    const textBox = inputs.getTextBox()
    const na = textBox.add("name")
    const last = textBox.add("last-name", "nn")
    textBox.on(last, "keyup", function () { console.log(this.e); }, "test")

    const switchBox = inputs.getSwitchBox()
    const a = switchBox.add("Accept cookies")
    const al = switchBox.add("Allow notification")
    switchBox.once(a, "active", () => { alert('Accept cookies active'); })
    switchBox.once(a, "disable", () => { alert('Accept cookies disable'); })
    const other = checkBox.add("other options", "otherOption", false, false, switchBox)
    checkBox.once(other, "active", () => { alert('other option active'); })
    checkBox.once(other, "disable", () => { alert('other option disable'); })



    const passwords = inputs.getPassWordBox()
    passwords.autoComplate = {
        autoComplate: ["111050", "556622", "002hshs", "kkksh_sjjs5"],
        defaultValue: ["get your password", "loui@-$%hh5525", "kks5ksksk", "755553s", "jjsjs4"],
        whenSelect: (v) => console.log(v)
    }
    const pa = passwords.add("passWord")

    passwords.setSize(pa, "100%")
    const emails = inputs.getEmailBox()

    emails.add("Your eamil", "email", false, { attr: { placeholder: "Email" } })
    p.add(checkBox)
    h.add(radioBtns)
    t.add(textBox)
    s.add(switchBox)
    e.add(emails)
    pass.add(passwords)

    const main = leistrap.Div({
        content: [leistrap.API.txt.help, allcom, p, h, t, s, pass, e]
    })
    main.addClass("df")

    leistrap.API.input_content.add(main)

})()