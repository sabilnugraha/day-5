const emailReceiver ='vshnugraha@gmail.com'

function submitForm() {

    let name = document.getElementById("input-name").value
    let email = document.getElementById("input-email").value
    let phone = document.getElementById("input-number").value
    let subject = document.getElementById("input-subject").value
    let message = document.getElementById("input-Message").value

    if (name=="") {
        alert("Nama kamu harus diisi")
    }

    if (email=="") {
        alert("email kamu harus diisi")
    }

    if (phone=="") {
        alert("Nomor Telpon kamu harus diisi")
    }

    if (subject=="") {
        alert("subject kamu harus diisi")
    }

    if (message=="") {
        alert("pesan kamu harus diisi")
    }

    console.log(name)
    console.log(email)
    console.log(phone)
    console.log(subject)
    console.log(message) 

    let a = document.createElement('a')
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo my name ${name}, ${message}`
    a.click()

    console.log(a)

}

