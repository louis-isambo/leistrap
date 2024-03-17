leistrap.exportObject("txt", {
    'ItI':

        "Leistrap est une librairie front-end permettant la création des interfaces utilisateurs\
    d'une manière simple et efficace",
    "mtds": {
        "title": "Liste des méthodes appliquées à tous les éléments",
        "ex": "La colonne ##Paramettre indique le nombre d'arguments qu'on peut passer\
        sur une methode et le type de donnée accepté pour un argument. Le ##No_Param signifie que \
        la méthode n'a pas de paramettre.",
    },
    "elemUsable": {
        "title": "Comment utiliser un élément Leistrap ?",
        "ex": "En lisant les propriétés et méthodes pour un élément Leistrap, vous avez un peu l'idée comment serait l'utilisation\
        d'un élément Leistrap et si ce n'est pas le cas, ci-dessous nous vous montrons comment utiliser un élément Leistrap."
    },
    "props": {
        "title": "Liste des propriétés pour un élément Leistrap",
        "ex": "Chaque propriété d'un élément Leistrap a un type de donnée particulier et si celui-ci n'est pas\
        respecté il peut causer des erreurs. Dans le tableau présenté ci-dessous, la colonne ##Type vous indique\
        quel type de donnée accepté par la propriété. Si la valeur de la colonne ##Type est : ##Any : tout type de \
        donnée est valide, ##BaseElement[] : une liste Base€lement, ##Option : c'est une option donc le type de\
        donnée c'est ##Object.",
        "note": "Note: Les propriétés d'un élément Leistrap n'ont effet qu'avant que la page soit rendue (avant que\
            que la page soit affichée sur écran), si la page est déjà rendue utilisez les méthodes plutôt que\
            les propriétés",
        "note1": "Note: Oui! vous pouvez initialiser toutes les propriétés directement par ##option, plutôt que par\
        l'object créé. voir : l'initialisation des %propriétés_par_option .",
        "initOption": {
            "title": "Initialisation des propriétés par option",
            "ex": "L'initialisation des propriétés par option vous facilite la tâche, au lieu à chaque fois appeler\
            l'object qui a été créé et initialiser une propriété, une Option (ou object) de clé-valeur vous permet de tout initialiser par un coup.\
            Exemple :",
            "exa": `/*Initialisation des propriétés par option*/%nl%const paragraphe = leistrap.P({%nl%tbtext%:"Le contenu du paragraphe",%nl%tbeventType%:"click",%nl%tbeventOnce%:%function(){console.log("hello")}%nl})`
        },
        "initObject": {
            "title": "Initialiser les propriétés d'un élément.",
            "ex": "L'initialisation des propriétés d'un élément (ou object) Leistrap.",
            "exa": `/*Initialiser les propriétés d'un élément%nlet on écoute un événement...*/%nl%const paragraphe = leistrap.P();%nl paragraphe.text%="le contenu du paragraphe";%nlparagraphe.eventType%="click";%nlparagraphe.eventOnce%=%function(){console.log("hello")};`
        },
        "text": {
            "DS": "La propriété ##text permt d'ajouter du texte sur un élément",
            "tp": "String"
        }, "parent": {
            "DS": "La propriété ##parent definit l'élément parent d'un élément Leistrap ",
            "tp": "BaseElement"
        }, "type": {
            "DS": "La propriété ##type pour un élément Leistrap définit le type de couleur pris en charge pour \
            un élément",
            "tp": "String"
        }, "content": {
            "DS": "La propriété ##content est utilisée pour définir le contenu d'un élément",
            "tp": "BaseElement[]"
        }, "eventType": {
            "DS": "##eventType définit le type d'événement à écouter",
            "tp": "String"
        }, "eventOnce": {
            "DS": "##eventOnce  est utilisé pour associer une fonction qui écoute l'événement enregistré dans ##eventType,\
            dès que l'événement déclanché la fonction qui écoute cette événement sera appelée",
            "tp": "Function"
        },
        "attr": {
            "DS": "La propriété ##attr (attribut) permet d'aujouter les attributs HTML sur un élément, c'est une option qui prend\
            que 2 attributs html , ##Id et  ##ClassName pour classe CSS. si vous voulez ajouter d'autres attributs\
            HTML, utilisez la propriété ##otheAttr (otherAttr qui veut dire autres attributs).",
            "tp": "Option"
        }, "otherAttr": {
            "DS": "La propriété ##otheAttr (otherAttr qui veut dire autres attributs) permet d'ajouter plusieurs attributs HTML sur un\
            élément",
            "tp": "Option"
        }, "addData": {
            "DS": "Cette propriété permet juste de stocker quelques données sur un élément et enfin de l'utiliser au cas où\
            vous en avez besoin",
            "tp": "Any"
        }, "innerHtml": {
            "DS": "La propriété ##innerHtml permet de changer le innerTML d'un élément",
            "tp": "String"
        }, "autoClick": {
            "DS": "Si la valeur de la propriété ##autoClick est ##true, l'élément sera automatiquement cliqué dès que le\
            proccessus de moteur de rendu aura fini.",
            "tp": "Boolean"
        }, "tooltip": {
            "DS": "Cette propriété permet d'ajouter le composant tootip dans un élément Leistrap. Si vous ne savez\
            pas encore comment utiliser le ##tooltip , allez dans l'anglet ##composant et cliquez sur toolip.",
            "tp": "Option"
        },
        "linkName": {
            "DS": "Si vous utilisez le composant ##TabPage, cette propriété vous permet de donner un nom sur votre\
            ##élément_declancheur de Tab. ce nom vous serait utile lorsque vous auriez besoin d'afficher le contentu\
            du ##Tab associé à ce nom.",
            "tp": "String"
        }, "leisBtnConfId": {
            "DS": "La propriété ##leisBtnConfId est l'identifiant unique d'un élément Leistrap. Attention ! ne changez\
            pas la valeur de cette propriété car cela peut causer des erreurs dans votre code",
            "tp": "No"
        }

    },
    "lsE":
        "Les éléments Leistrap ne sont que des éléments HTML, Voici une liste d'éléments pris en charges.",

    "Div":
        "L'élément ##Div , pour << division >>, est un élément de bloc qui a vocation à contenir\
        d'autres éléments. Div regroupe du contenu à l'intérieur.",

    "P": "L'élément ##P représente un paragraphe",
    "Span": "L'élément ##Span est un conteneur générique en ligne (inline) pour les contenus phrasés.",
    "Script": "L'élément ##Script est utilisé pour intégrer ou faire référence à un script exécutable. cela fait généralement référence à du code javaScript.",
    "Link": "L'élément de lien vers des ressources externes. L'élément ##Link définit la rélation entre le document courant et une ressource externe.",
    "Button": "L'élément ##Button  représente un bouton cliquable, utilisé pour soumettre\
    des formulaires ou n'importe où dans un documenet pour une fonctionnalité de bouton accessible\
    et standard. Par defaut le L'élément Button en Leistrap a une couleur qui ressemble à ça ....<button type=\"button\" class=\"leis-btn\">Btn default</button> \
    si vous voulez modifier la couleur, ajouter une propriété ##type et comme valeur:  ##primary, ##secondary', ##success, ##info', ##dark', ##danger', ##warning, ##ligh' ",
    "Input": "L'élément  de saisie dans un formulaire. L'élément ##input est utilisé pour créer un contrôle interactif dans un formulaire web qui permet à l'utilisatrice ou utilisateur de saisir des données.",
    "A": "L'élément ##A (pour ancre ou anchor en anglais), avec son attribut ##href, crée un lien hypertexte vers des pages webs, des fichiers, des adresses e-mail, des emplacements se trouvant dans la même page, ou tout ce qu'une ##URL peur adresser. ",
    "H1 - H6": "Les éléments ##H1-H6 représentent les six niveaux de titre de section. ##H1 correspond au niveau de section le plus haut et ##H6 correspond au niveau le plus faible.",
    "I": "L'élément ##I représente un morceau de texte qui se diférencie du texte principal. Cela peut par exemle être le cas pour  des termes techniques, des phrases dans une langue étrangère ou encore l'expression des pensées d'un personneage. Le contenu de cet élément est également affiché en italique.",
    "Img": "L'élément ##image embarquée, permet d'interégrer une image dans un document.",
    "Label": "L'élément ##Label est particulièrement important pour la clarté et accessibilité d'un site Web. Il est utilisé dans les formulaire et ajoute une lgénde explicative ou une étiquette à des éléments tels que les champs de saisie, les boutons ou les cases à cocher.",
    "Li": "L'élément ##Li est utilisé pour représenter un éléement dans une liste. Il doit être contenu dans un élément parent: une liste ordonnée ##Ol ou une liste non ordonnée.",
    "Ol": "L'élément de liste ordonnée, l'élément ##Ol représente une liste ordonnée.  Les élément d'une telle liste sont générament affichés avec un indicateur ordinal pouavant prendre la forme de nombres, des lettres, des chiffres romains ou des points.",
    "THead": "L'élément ##THead définit un ensemble de lignes qui définit l'en-tête des colonnes  d'un tableau.",
    "Table": "L'élément de tableau, permet de représenter un tableau de données, c'est-à-dire des informations exprimées sur un tableau en deux dimensions.",
    "Tbody": "Permet de regrouper un ou plusieurs éléments ##Tr afin de former le corps d'un tableau HTML.",
    "Td": "L'élément de cellule de tableau, définit une cellule d'un tbaleau qui contient des données. Cet élément fait partie du modèle de tableau.",
    "Textarea": "représente  un contrôle qi permet d'éditer du texte sur plusieurs lignes.",
    "Tfoot": "L'élément ##Tfooot permet de définir un  ensemble des lignes qui résument  les colonnes d'un tableau.",
    "Th": "L'élément ##Th définit une cellule d'un tableau  comme une cellule d'en-tête pour groupe de cellule.",
    'Tr': "L'élément de ligne d'un tableau, l'élémemnt ##Tr  définit une ligne de cellules dans un tableau.",
    "Ul": "L'élément ##Ul représente une liste d'éléments sans ordre particulier",
    "components": {
        "Button": {
            "DS": "Le composant ##Button vous permet à  manipuler, regrouper, et  contrôler le comportement des boutons de votre page. Les détails sur le composant ##Button sont présentés ci-dessous.",
            "exe1": "Les modèles des boutons, ne sont que les differentes couleurs, le style, et la taille qu'un bouton Leistrap peut avoir.  En regardant les boutons présentés ci-haut, vous avez déjè constaté qu'on a 8 diffentes couleurs, 3 diffenetes tailles d'un bouton peut avoir.",
            "exe2": "L'élément ##Button  de Leistrap a deux ##methodes qui permettent de créer deux categories de composants; y a la méthode ##getButton et ##GroupBtn. \
            La méthode ##getButton() vous permet de recupérer un bouton Leistrap enfin de changer le style, la taille, la couleur d'une manière simple, aussi d'ajouter les événements.\
            La methode ##GroupBtn vous permet de grouper les boutons dans une carte.",
            "mt1": "La méthode ##getButton retourn quelques méthodes appliquable pour bouton Leistrap, voici un tbaleau qui décrit chaque méthode retournée par la méthode ##getButton. "
        },
        "Card": {
            "DS": "Le composant Leistrap ##Card (carte en français) est une interface permet l'affichage structuré des informations de votre site ou page Web."
        },
        "Table": {
            "DS": "Le composant Leistrap ##Table permet la création et manipulation des cellules d'un table, en utilisant les méthodes de ##creation, ##insertion , ##suppression, fusion et modification d'une cellule.",
        },
        "Input": {

        },
        "CloseBtn": {

        },
        "TabPage": {

        },
        "PageLegend": {

        },
        "Accordion": {

        },
        "GroupItem": {

        },
        "Page": {

        },
        "Calendar": {

        },
        "DropDown": {

        },
        "SlideDown": {

        }, "Alerts": {

        },
        "TopNav": {

        },
        "SideBar": {

        },
        "Collapsible": {

        },
        "SearchBar": {

        },
        "ToolTip": {

        },
        "Modal": {

        },
        "GroupButton": {

        },
        "PageButton": {

        }
    },
    "help": leistrap.P({ text: "Cette page est incomplete ! Veuillez nous aider à la completer ! ", otherAttr: { "class": "help" } }),
    "methods": {
        "add": {
            "DS": "La méthode ##add permet d'ajouter un élément enfant dans le présent élément",
            "Param": "BaseElement"
        },

        "addElements": {
            "DS": "La méthode ##addElements fonctionne comme  la méthode ##add mais cette\
            dernière ajoute plusieurs éléments enfants, en les passant comme paramettre. Elle ajoute un ou plusieurs\
            éléments à la fois.",
            "Param": "BaseElement, BaseElement, BaseElement etc..."
        },
        "setStyleProp": {
            "DS": "La méthode ##setStyleProp permet de changer la valeur d'une propriété ##style du CSSS",
            "Param": "##String, ##String"
        },
        "getScreen": {
            "DS": "La méthode ##getScreen permet de deplacer l'écran vers l'élément",
            "Param": "No Param"
        },

        "removeAll": {
            "DS": "La méthode ##removeAll permet de supprimer tous les éléments enfants d'un élément parant",
            "Param": "No Param"
        },
        "removeAttr": {
            "DS": "La méthode ##removeAttr permet la suppression d'un attribut HTML d'un élément",
            "Param": "String"
        },
        "removeEvent": {
            "DS": "La méthode ##removeEvent permet la suppréssion d'un écouteur d'evenemnent",
            "Param": "String, String, Boolean"
        },
        "getRemovedElement": {
            "DS": "La méthode ##getRemovedElement cherche tous les éléments enfants supprimés et ensuite les retourne",
            "Param": "No Param"
        },
        "destroy": {
            "DS": "La méthode ##destroy permet de detruire un élément et le supprimer dans le DOM",
            "Param": "No Param"
        },
        "setText": {
            "DS": "La méthode  ##setText permet d'assigner ou changer la valeur de propriété ##text d'un élément",
            "Param": "String"
        },
        "getText": {
            "DS": "La méthode ##setText retourne le valeur de text d'un élément",
            "Param": "No Param"
        },
        "hide": {
            "DS": "La méthode ##hide de cacher un élément mais celui-ci ne serait pas supprimé",
            "Param": "String"
        },
        "show": {
            "DS": "La méthode ##show permet d'afficher un éléments qui a été caché, c'est l'inverse de la méthode ##hide",
            "Param": "String"
        },
        "CASCADE": {
            "DS": "Cette méthode parcourt tous les éléments enfants d'un élément parent et en fin d'activer les éléments enfants\
            qui ne sont pas visible dans la page",
            "Param": "No Param"
        },
        "addAttr": {
            "DS": "La méthode ##addAttr permet d'ajouter un attribut HTML sur un élément ",
            "Param": "String, String"
        },
        "removeClass": {
            "DS": "La méthode ##removeClass permet de supprimer une classe CSS sur un élément",
            "Param": "String"
        },
        "addClass": {
            "DS": "La méthode ##addClass permet d'ajouter une classe CSS sur un élément",
            "Param": "String"
        },
        "toggleClass": {
            "DS": "La méthode ##toggleClass bascule entre ajouter et supprimer une classe CSS",
            "Param": "String"
        },
        "setStyle": {
            "DS": "La méthode ##setStyle permet de changer le style CSS d'un élément",
            "Param": "String"
        },
        "addEvent": {
            "DS": "La méthode ##addEvent permet d'ajouter un écouteur d'événement sur un élément",
            "Param": "String, Function, String, Boolean"
        },
        "remove": {
            "DS": "La méthode ##permet de supprimer un élément enfant d'un élément parant",
            "Param": "BaseElement"
        },
        "setClassName": {
            "DS": "La méthode ##setClassName permet d'initialiser une classe CSS d'une élement",
            "Param": "String"
        }
    },
    "usableElem": {
        "Div": {
            "ex": "Ajouter un contaire Div dans votre LS-Appplication",
            "exa": `/*contenaire parent*/%nl%const card%=leistrap.Div({%nl%tb text:"je suis le conentu parent";%nl%tb});%nl%nl/* div enfant*/%nl%const child%=leistrap.Div({%nl%tbtext:"je suis un élément enfant"%nl})`
        }, "P": {
            "ex": `Création  d'un paragraphe en Leistrap`,
            "exa": `/*%20exemple%20d'un%20paragraphe*/%nl%nl%const%20MyP%20=%20leistrap.P({%nl%tbtext:%20"je%20suis%20un%20paragraphe",%nl%tbotherAttr:%20{%20style:%20"color:%20red;%20font-size%20:%202rem"%20},%20/*%20changer%20la%20couleur%20de%20texte*/%nl})`
        }, "Span": {
            "ex": "L'utilisation d'un élément span en Leistrap",
            "exa": `/*%20changer%20la%20couleur%20d'ariière%20plan%20et%20du%20texte%20en%20utilisant%20la%20propriété%20otherAttr*/%nl%nl%const%20MySpan%20=%20leistrap.Span({%nl%tbtext:%20"je%20suis%20un%20élément%20Span",%nl%tbotherAttr:%20{%20style:%20"background:%20black;%20color%20:%20white"%20},%20%nl})`
        },
        "Script": {
            "ex": "Ajouter d'autres fichiers JavaScript dans votre LS-Applicatio",
            "exa": `/*%20Ajout%20d'un%20nouveau%20fichier%20JS*/%nl%const%20file%20=%20"./repertoire/fichier.js"%nl%nl%const%20MyScript%20=%20leistrap.Script({%nl%tbotherAttr:%20{%20src:%20file%20},%20%20%nl})%nl%nl/*%20l'option%20otheAttr%20=>%20src,%20definit%20l'emplacement%20de%20votre%20fichier%20JavaScript*/%nl`
        }, "Link": {
            "ex": "Ajouter d'autres Métadonnées dans votre LS-Application",
            "exa": `/*%20Cet%20exemple%20vous%20montre%20comment%20vous%20pouvez%20ajouter%20une%20feuille%20de%nlstyle%20dans%20votre%20LS-Application*/%nl%nl%nl%const%20MyCss=%20leistrap.Link({%nl%tbotherAttr:%20{%20%nl%tb%tbrel:"stylesheet",%nl%tb%tbhref="./repertoire/style.css",%nl%tb%tbtype:%20"text/css",%nl%tb%20},%20%20%nl})%nl%nl/*%20%nl%tb1.%20l'option%20otheAttr%20=>%20href,%20definit%20l'emplacement%20de%20votre%20feuille%20de%20Style%nl%tb2.%20l'option%20otheAttr%20=>%20rel,%20definit%20le%20type%20de%20rélation%nl%tb3%20.l'option%20otheAttr%20=>%20href,%20definit%20le%20type%20des%20données%20que%20vous%20voulez%20relier%tb%nl*/%nl`
        },
        "Button": {
            "ex": "Ajouter un Button Leistrap",
            "exa": `/*%20Ajouter%20un%20bouton%20Leistrap%20*/%nl%nl%nl%const%20MyBtn=%20leistrap.Button({%nl%tbtext:%20"cliquez-moi",%nl%tbeventType:%20"click",%nl%tbeventOnce%20:%20%function%20(){%20alert("salut%20le%20monde%20!")},%nl%tbtype:%20"primary",%20%nl})%nl%nl/*%20%nl%tb1.%20La%20propriété%20type,%20definit%20la%20couleur%20primary%20de%20Leistrap;%nl%tb2.%20La%20propriété%20evenType,%20definit%20le%20type%20d'événement%20qu'on%20va%20écouter%20sur%20notre%20button;%nl%tb3.%20La%20propriété%20eventOnce,%20c'est%20l'écouter%20de%20notre%20événement%20quand%20%nl%tbun%20utilisateur%20clique%20sur%20le%20button%20on%20affiche%20un%20alert%20=>%20salut%20le%20monde%20!;%nl*/%nl`
        }, "Input": {
            "ex": "Ajouter un champ dans votre LS-Application",
            "exa": `/*%20Cet%20exemple%20vous%20montre%20comment%20ajouter%20un%20champ%20de%20saisie*/%nl%nl%nl%const%20MyTextBox=%20leistrap.Input({%nl%tbotherAttr%20:%20{type%20:%20"text"%20},%nl%tbeventType:%20"keyup",%nl%tbeventOnce%20:%20%function%20(){%20console.log(this.getValue()))%20},%20%nl})%nl%nl/*%20%nl%tb1.%20option%20otherAttr%20=>%20type,%20definit%20le%20type%20de%20champ;%nl%tb2.%20La%20propriété%20evenType,%20definit%20le%20type%20d'événement%20qu'on%20va%20écouter%20sur%20notre%20button;%nl%tb3.%20La%20propriété%20eventOnce,%20c'est%20l'écouter%20de%20notre%20événement%20quand%20%nl%tbun%20utilisateur%20presse%20et%20relache%20la%20%20touche%20du%20clavier%20on%20affiche%20la%20valeur%20qu'il%20saisie%20en%20console;%nl*/%nl`
        }, "Label": {
            "ex": "L'utilisation d'un Lable en leistrap",
            "exa": `/*%20Utiliser%20un%20Label*/%nl%nl%const%20input%20=%20leistrap.Input()%nlinput.otherAttr%20=%20{type%20:%20"text",%20id%20:%20"main"}%nl%nl%const%20label%20=%20leistrap.Input({%nl%tbtext:%20"Nom",%nl%tblblFor%20:%20"nom"%20%nl})%nl%nl%const%20card%20=%20leistrap.Div({%nl%tbcontent%20:%20[label,%20input]%nl})%nl`
        }, "Img": {
            "ex": "Ajouter une image dans votre LS-Application",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20une%20image%20*/%nl%tb%nl%tb%const%20MyImg%20=%20leistrap.Img({%nl%tb%tbotherAttr%20:%20{src%20:%20"./repertoire/image.jpg"}%tb%nl%tb})%20%nl%nl%tb/*%nl%tb%tbotherAttr%20=>%20str%20permet%20de%20définir%20l'emplacement%20du%20fichier%nl%tb*/%nl`
        }, "Ol": {
            "ex": "Créer une liste ordonnée",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20créer%20une%20liste%20ordonnée%20en%20Leistrap*/%nl%tb%nl%tb%const%20li1%20=%20leistrap.Li({text:"premier%20élément"})%nl%tb%const%20li2%20=%20leistrap.Li({text:"deuxième%20élément"})%nl%tb%nl%tb%const%20myList%20=%20leistrao.Ol({%nl%tb%tbcontent%20:%20[%20li1,%20li2%20]%nl%tb})%20%nl`
        },
        "Ul": {
            "ex": "Créer une liste non-ordonnée",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20créer%20une%20liste%20%20non-ordonnée%20en%20Leistrap*/%nl%tb%nl%tb%const%20li1%20=%20leistrap.Li({text:"premier%20élément"})%nl%tb%const%20li2%20=%20leistrap.Li({text:"deuxième%20élément"})%nl%tb%nl%tb%const%20myList%20=%20leistrao.Ul({%nl%tb%tbcontent%20:%20[%20li1,%20li2%20]%nl%tb})%20%nl`
        }, "Li": {
            "ex": "Ajouter un élément d'une liste",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20un%20élément%20d'une%20liste%20Leistrap*/%nl%tb%nl%tb%const%20maListe%20=%20leistrap.Ol()%nl%tb%nl%tb%const%20MonElement%20=%20leistrap.Li({%nl%tb%tbtext:"je%20suis%20un%20élément",%nl%tb%tbparent%20:%20maListe%nl%tb})%nl%tb%nl`
        }, "I": {
            "ex": "Ajouter un texte en Italique ",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20%20du%20texte%20en%20italique*/%nl%tb%nl%tb%const%20italic%20=%20lestrap.I({%nl%tb%tbtext:%20"%20text%20en%20italic"%nl%tb})%nl%nl`
        }, "A": {
            "ex": "Ajouter un lien",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20%20un%20lien%20menant%20vers%20d'autre%20page,%20site,%20ancre*/%nl%tb%nl%20%20%20%const%20google%20=%20leistrap.A({%nl%tb%tbtext%20:%20"Aller%20sur%20google",%nl%tb%tbotherAttr%20:%20{%20href:%20"https://www.google.com"%20}%20%nl%20%20%20})%nl%nl`
        }, "Textarea": {
            "ex": "Ajouter une zone de texte dans votre LS-Application",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20%20une%20zone%20de%20texte%20*/%nl%tb%nl%20%20%20%const%20maZone%20=%20leistrap.Textarea({%nl%tbotherAttr%20:{%20value%20:%20"valuer%20par%20défaut"}%nl%20%20%20})%nl%nl`
        },
        "Table": {
            "ex": "Créer un tableau dans Leistrap",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20créer%20un%20tableau%20dans%20Leistrap%20*/%nl%tb%nl%nl%tb/*%20l'en-tête%20%20*/%20%nl%20%20%20%const%20head%20=%20leistrap.THead()%nl%nl%20%20%20%const%20heading1%20=%20leistrap.Th({%nl%tb%tbtext:%20"nom",%nl%tb%tbparent%20:%20head,%nl%tb})%nl%20%20%20%nl%tb%const%20heading2%20=%20leistrap.Th({%nl%tb%tbtext:%20"post-nom",%nl%tb%tbparent%20:%20head%nl%tb})%nl%nl%tb/*%20Le%20corps%20*/%nl%nl%tb%const%20body%20=%20leistrap.Tbody()%nl%nl%tb/*%20première%20line%20*/%nl%nl%tb%const%20line1%20=%20leistrap.Tr({%nl%tb%tbcontent%20:%20[%nl%tb%tb%tbleistrap.Td({%20text%20:%20"Isambo"%20}),%nl%tb%tb%tbleistrap.Td({%20text%20:%20"Elika"%20}),%nl%tb%tb],%nl%tb%tbparent%20:%20body%nl%tb})%nl%nl%tb/*%20deuxième%20line%20*/%nl%nl%tb%const%20line2%20=%20leistrap.Tr({%nl%tb%tbcontent%20:%20[%nl%tb%tb%tbleistrap.Td({%20text%20:%20"Bitubishi"%20}),%nl%tb%tb%tbleistrap.Td({%20text%20:%20"Kevin"%20}),%nl%tb%tb],%nl%tb%tbparent%20:%20body%nl%tb})%nl%nl%tb/*%20tableau%20*/%nl%tb%const%20maTable%20=%20leistap.Table({%nl%tb%tbcontent%20:[%20head,%20body]%nl%tb})%nl%tb`
        }, "THead": {
            "ex": "En-tête d'un tableau",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20créer%20un%20en-tête%20pour%20un%20tableau%20*/%nl%tb%nl%nl%tb/*%20l'en-tête%20%20*/%20%nl%20%20%20%const%20head%20=%20leistrap.THead()%nl%nl%20%20%20%const%20heading1%20=%20leistrap.Th({%nl%tb%tbtext:%20"nom",%nl%tb%tbparent%20:%20head,%nl%tb})%nl%20%20%20%nl%tb%const%20heading2%20=%20leistrap.Th({%nl%tb%tbtext:%20"post-nom",%nl%tb%tbparent%20:%20head%nl%tb})%nl%tb`
        }, "Th": {
            "ex": "Les Titres d'un en-tête pour un tableau",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajputer%20les%20titres%20d'un%20tableau%20*/%nl%tb%nl%tb/*%20titre%201*/%nl%20%20%20%const%20titre1%20=%20leistrap.Th({%nl%tb%tbtext:%20"nom",%nl%tb%tbparent%20:%20head,%nl%tb})%nl%tb/*%20titre%202*/%nl%tb%const%20titre2%20=%20leistrap.Th({%nl%tb%tbtext:%20"post-nom",%nl%tb%tbparent%20:%20head%nl%tb})%nl%tb`
        }, "Tbody": {
            "ex": "Le corps d'un tableau",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20créer%20le%20corps%20d'un%20tableau*/%nl%tb%nl%tb/*%20Le%20corps%20*/%nl%nl%tb%const%20coprs%20=%20leistrap.Tbody({%nl%tb%tbcontent%20:%20[%nl%tb%tb%tbleistrap.Tr({content%20:[leistrap.Td({text:"item"})]})%nl%tb%tb]%nl%tb})%nl%tb%nl%tb`
        }, "Tr": {
            "ex": "Ajouter des lines d'un tableau",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20des%20lines%20d'un%20tableau*/%nl%tb%nl%tb/*%20première%20line%20*/%nl%nl%const%20line1%20=%20leistrap.Tr({%nl%tbcontent%20:%20[%nl%tbleistrap.Td({%20text%20:%20"Isambo"%20}),%nl%tbleistrap.Td({%20text%20:%20"Elika"%20}),%nl%tb],%nl%tbparent%20:%20body%nl})%nl%nl/*%20deuxième%20line%20*/%nl%nl%const%20line2%20=%20leistrap.Tr({%nl%tbcontent%20:%20[%nl%tbleistrap.Td({%20text%20:%20"Bitubishi"%20}),%nl%tbleistrap.Td({%20text%20:%20"Kevin"%20}),%nl%tb],%nl%tbparent%20:%20body%nl})%nl%tb%nl%tb`
        },
        "Td": {
            "ex": "Ajouter des cellules d'un tableau",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20des%20cellules%20d'un%20tableau*/%nl%tb%nl%tb%const%20line%20=%20leistrap.Tr({%nl%tb%20%20%20%nl%tb%tbcontent%20:%nl%tb%tb[%nl%tb%tb%tb/*%20cellule%201%20*/%nl%tb%tb%tbleistrap.Td({%20text:%20"cellule1"}),%nl%tb%tb%tb/*%20cellule%202%20*/%nl%tb%tb%tbleistrap.Td({%20text:%20"cellule2"}),%nl%tb%tb%tb/*%20cellule%203%20*/%nl%tb%tb%tbleistrap.Td({%20text:%20"cellule3"}),%nl%tb%tb%tb/*%20cellule%204%20*/%nl%tb%tb%tbleistrap.Td({%20text:%20"cellule4"})%nl%tb%tb]%nl%tb})%nl%tb`
        }, "Tfoot": {
            "ex": "Ajouter un pied de tableau",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20un%20pied%20de%20tableau*/%nl%tb%nl%tb%const%20pied%20=%20leistrap.Tfoot({%nl%tb%tb/*%20essayez%20d'ajputer%20le%20contenu%20ici%20.....*/%nl%tb})%nl%tb`
        }, "H1 - H6": {
            "ex": "Les titres allant d 1 à 6",
            "exa": `/*cet%20exemple%20vous%20montre%20comment%20ajouter%20les%20%20titres%20*/%nl%tb%nl%tb%const%20titre1%20=%20leistrap.H1({%20text%20:%20"titre1"%20})%nl%tb%const%20titre2%20=%20leistrap.H2({%20text%20:%20"titre2"%20})%nl%tb%const%20titre3%20=%20leistrap.H3({%20text%20:%20"titre3"%20})%nl%tb%const%20titre4%20=%20leistrap.H4({%20text%20:%20"titre4"%20})%nl%tb%const%20titre5%20=%20leistrap.H5({%20text%20:%20"titre5"%20})%nl%tb%const%20titre6%20=%20leistrap.H6({%20text%20:%20"titre6"%20})%nl%tb`
        }
    }


})
