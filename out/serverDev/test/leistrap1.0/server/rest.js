module.exports.html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>leistrap server</title>
</head>

<body>
    <div id="ess"></div>
    <button onclick="displayInfo()">get Info</button>
    <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, ipsa unde. Aliquid, placeat quibusdam magnam
        reiciendis incidunt dolorem perspiciatis veniam id. Quas dolore veniam voluptatibus vero consequatur minus
        perspiciatis voluptate.
        Officiis obcaecati id cupiditate magnam error deleniti enim sed, expedita ipsum nihil excepturi adipisci ratione
        facere quasi fuga placeat saepe. Consectetur laboriosam, voluptas reprehenderit molestiae repudiandae iste optio
        alias culpa.
        Quam quasi nostrum ducimus laudantium assumenda molestias exercitationem, amet quisquam magnam soluta beatae
        aperiam obcaecati ullam vero consequatur blanditiis fugiat sequi. Voluptatem ut ullam necessitatibus veritatis
        quo eaque sit excepturi?
        Minima voluptatum laborum non voluptatem? Velit saepe officiis eveniet dolor adipisci quo consequuntur atque,
        quod molestiae totam ipsum alias! Ratione commodi, minus voluptatem ad eaque saepe praesentium dolorum quasi
        temporibus!
        Aperiam eum, asperiores voluptate pariatur amet neque. Veritatis, corporis minus voluptatem natus ducimus
        impedit obcaecati porro facere. Aperiam adipisci, magnam, omnis dolores ea sapiente minus laudantium, recusandae
        veniam dolor fuga.
        Nisi neque eveniet, corporis sunt eius quae aperiam at itaque, iste obcaecati sint consequatur perspiciatis
        aliquam doloribus, est tempora nostrum praesentium quia! Magnam vel, architecto vero minus soluta facilis
        beatae.
        Labore cum tenetur voluptates dolor, atque pariatur ipsam et, architecto hic sit cupiditate omnis ex aut dolorem
        quam velit, illo quasi odit quod deleniti? Voluptatum quo deserunt nihil a! Cum.
        Omnis aperiam, eaque doloremque, atque vitae ducimus, ab hic modi soluta rem praesentium. Quia porro eum error
        repellendus exercitationem, officia perspiciatis perferendis. Doloremque minus officia expedita asperiores
        incidunt enim debitis!
        Dignissimos temporibus non, dicta iusto aspernatur rerum quam facilis exercitationem voluptatum ab! Laborum
        beatae eum illo dignissimos quod molestiae excepturi aliquam veritatis fugit officia vero corporis reiciendis,
        officiis voluptatem similique.
        Obcaecati aut repudiandae asperiores recusandae dignissimos vero explicabo. Alias distinctio voluptates ipsam
        eos eligendi cupiditate. Incidunt blanditiis quibusdam odit, id, omnis atque assumenda corrupti aspernatur ullam
        soluta ex possimus itaque.
    </div>

    <script>
        function displayInfo() {
            fetch("http://localhost:3000/use/displayInfo")
        }

    </script>
</body>

</html>`