
/**
 * Leistrap Module 
 */
declare namespace leistrap {
    class LeisElementProp<type> {
        /** defines the text content of the element  */
        text: string;

        /** the element parent */
        parent: BaseElement;

        /**
        * event type. choose the type of event to listen, you can also
        * choose the eventType by retruning the type of event in the eventOnce callback
        * @type string
        * @example
        * 
        * const btn = leistrap.Button({
        *  // you can directly choose the event type via eventType property
        * 
        * eventType : "click" // listen the click event
        * 
        * // or in the callback (function) you can return the event type
        * 
        * eventOnce :function MyCallback(){
        *      //code goes here .....
        *      return this.eventtype = "click"  
        * }
        * })
        */
        eventType: keyof LeisEventNameMap;

        /** add an event listener tp handle the `eventType` type you defined */
        eventOnce: (e: Event) => void;

        /**
         * defines the default attributes to be assigned to the current Element
         * this property takes only 3 attributes :
         * 
         * 1 `id` : defines the unique identifier of the element,
         * 2 `className : the class nme to be used with the css ,
         * 3 `name` :  the element name`  
         */

        attr: {

            /** defines the unique identifier of the element*/
            id: string,

            /** 
             * the class nme to be used with the css.
             * You can use a single `string literal` value or  you can also use an array of `string`
             * for example
             * @example
             *  attr : {
             *      className : "myClassName"
             *  }
             * 
             * // or you can make array of string;
             * 
             * attr : {
             *  className: ["myClassName1", "myClassName2"]
             *  }
             * */
            className: string | Array<string>,

            /**the element name */
            name: string
        };
        /**
         * with this `property` you can make any of  attributes of HTMLElement you want.
         * the `otherAttr ` allows you to define other attributes that you couldn't define
         * with the `attr` property`.
         * 
         * @example
         * 
         * 
         * otherAttr :{
         *  title : "this is a title",
         *  value ! "my value"
         * }
         * 
         */

        otherAttr: type;

        /**
         * this property allows you to save private values to your element.
         * this object is not accessible to the `DOM`.
         * 
         * @example 
         * 
         * addData :{
         *  mydata : "hello world",
         *  myApiKey : "hsllssjs2shns245hs",
         * 
         *  }  
         */
        addData: object;

        /**
         * add the eventListeners to your element. 
         * This property allows tou add one or many eventListeners to your element by using
         * an object of events `key/listener`
         * 
         * @example
         * 
         * const btn = leistrap.Button({
         *  text : "Click me",
         *  events : {
         *      click : function(e){ console.log("hello world !")}, // this listener listens to the click event
         *      mouseenter : function(e){ console.log("the mouse pointer is entered in the element")}
         *  }
         * })
         * 
         * @module
         * 
         * you can make any of HTMLElement EventMap
         */
        events: LeisEventNameMap;

        /** assign the innerHTML to the element */
        innerHtml: string;

        /** this property allows you to declare if the Element will automatically be clicked when the page
         * is loaded.
         * 
         * @example
         * 
         * const btn = leistrap.Button({
         *  text : "autoClick button",
         *  eventType : "click",
         *  eventOnce : function(){ console.log("the element was clicked")}
         * 
         * }) 
         */
        autoClick: LeisConfirm

        /** defines the `tooltip` component to the element */
        tooltip: Tooltip

        /** the name to be referenced to the element and this name must be unique */
        linkName: string;

        /** defines if the element will be indexed or tracked or not */
        index: LeisColorType;

        /**
        * type of the button -- this type uses `leistrap.css` color buttons class
        * @example
        * const btn1 = leistrap.Button({
        *  type : "primary"  // for the primary color
        * })
        * 
        * const btn2 = leistrap.Button({
        *  type : "secondary" // for the secondary color
        * })
        */
        type: LeisColorType;

        title: string;
        /**
         * add Css declaration  to the element
         */
        style: LeisCssStyleDeclaration
    }

    class BaseElement extends LeisElementProp<HTMLElement> {

        add(this: BaseElement, element: BaseElement): void;
        addElements(elements: Array<BaseElement>): void;
        setStyleProp<p extends keyof LeisCssStyleDeclaration, s = string>(prop: p, value: s): void;
        getScreen(option: any): void;
        removeAll(): void;
        removeAttr(name: string): void;
        removeEvent(type: keyof LeisEventNameMap, name: string, option: any): void;
        getRemovedElement(): void;
        destroy(): void;
        setText(text: string): void;
        getText(): string;
        render(): HTMLElement | null;
        show(css: LeisCssStyleDeclaration): void;
        CASCADE(): void;
        addAttr(): void;
        removeClass(): void;
        addClass(): void;
        toggleClass(): void;
        setStyle(css: LeisCssStyleDeclaration): void;
        addEvent(type: keyof LeisEventNameMap, listener: (e: Event) => void, name: string, option: any): void;
        remove: () => void;
        setClassName(): void;
        hide(css: LeisCssStyleDeclaration): void;
        bind(): void;
    }

    // leistrap Elements

    class LeisElementButton extends BaseElement {
        getButton(): LeisComponentButton;
        groupBtn(): LeisComponentGroupBtn
    }

    class LeisElementDiv extends BaseElement { }

    class LeisElementCard extends LeisElementDiv {
        getCard(): LeisComponentCard
    }

    class LeisElementHeading extends BaseElement { }

    class LeisElementImg extends BaseElement {
        src: string;
        alt: string;
    }
    class LeisElementSpan extends BaseElement { }
    class LeisElementI extends BaseElement { }

    class LeisElementInput extends BaseElement {
        getValue(): string;
        setValue(value: string): void;
        getRadio(): LeisComponentInupNTxt;
        getCheckBox(): LeisComponentInupNTxt;
        getSwitchBox(): LeisComponentInupNTxt;

        getTextBox(): LeisComponentTextBox
        getPassWordBox(): LeisComponentPassWordBox;
        getEmailBox(): LeisComponentEmailBox;

    }

    // leistrap Components
    class LeisComponentButton {
        setSize(size: LeisButtonSize): this;
        setType(type: LeisColorType): this;
        setBtnStyle(style: LeisButtonStyle): this;
        setIcon(icClass: string): this;
        setText(text: string): this;
        getText(): string;
        removeEvent(type: LeisEventNameMap, name: string, option: any): void;
        destroy(): void;
        getScreen(): void;
        on(type: keyof LeisEventNameMap, listener: (e: Event) => void,
            name: string, option: LeisConfirm): void;
    }

    class LeisComponentGroupBtn {
        add(text: string): LeisElementID;
        destroy(): void;
        remove(ID: LeisElementID): void;
        setText(ID: LeisElementID, value: string): void;
        on(ID: LeisElementID, event: keyof LeisEventNameMap, listener: (e: Event) => void,
            name: string, option: LeisConfirm): void;

        removeEvent(ID: LeisElementID, event: keyof LeisEventNameMap, name: String, option: any): void;
        removeAll(): void;
        setBtnSize(width: string, height: string): void;
        setType(color: LeisColorType): void;
        setSize(width: string): void;

    }

    class LeisComponentCard {

        header: string;
        title: string;
        footer: string;
        img: { path: string, pos: LeisElementPosition };
        setSize(width: string, height: string): void;
        destroy(): void;
        hide(css: string): void;
        show(css: string): void;
        setBsh(): void;
        add(element: BaseElement): void;
        remove(element: BaseElement): void;
        removeAll(): void;
        render(): HTMLElement | null;
        changeHeader(v: string | BaseElement): void;
        changeFooter(v: string | BaseElement): void;
        changeTitle(value: string): void;

    }

    class LeisComponentInupNTxt {
        add(lbl: string, value: string, parent: BaseElement | null, option: { attr: HTMLInputElement }): LeisElementID;
        remove(ID: LeisElementID): void;
        destroy(): void;
        once(ID: LeisElementID, event: LeisInputCustomEvent, listen: () => void): void;
        getChecked(): Array<any> | null;
        setLblText(ID: LeisElementID, value: string): void;


    }
    // components interfaces

    interface Tooltip { }

    // option interface
    interface LeisImgOption extends LeisElementProp<HTMLImageElement> {
        src: string;
        alt: string;
    }

    interface LeisSpanOption extends LeisElementProp<HTMLSpanElement> { }
    interface LeisItalicOption extends LeisElementProp<HTMLElement> { }
    interface LeisInputOption extends LeisElementProp<HTMLInputElement> { }

    // config elements

    class LeisElementID { }

    // definition of elements and components
    function Button(option: LeisElementProp<HTMLButtonElement>): LeisElementButton;
    function Card(option: LeisElementProp): LeisElementCard;
    function Div(option: LeisElementProp): LeisElementDiv;
    function H1(option: LeisElementProp): LeisElementHeading;
    function H2(option: LeisElementProp): LeisElementHeading;
    function H3(option: LeisElementProp): LeisElementHeading;
    function H4(option: LeisElementProp): LeisElementHeading;
    function H5(option: LeisElementProp): LeisElementHeading;
    function H6(option: LeisElementProp): LeisElementHeading;
    function Img(option: LeisImgOption): LeisElementImg;
    function Span(option: LeisSpanOption): LeisElementSpan;
    function I(option: LeisItalicOption): LeisElementI;
    function Input(option: LeisInputOption): LeisElementInput;
    function whenReady(listener: () => void): void;
    function render(id: string): void;
    function defineExtension(name: string, listener: (setting: any, leistrap: leistrap, option: LeisExtensionDefOption) => void): void;
    // types definition

    type LeisColorType = "primary" | "success" | "danger" | "info" | "secondary" | "warning" | "dark" | "light";
    type LeisButtonSize = 'normal' | 'small' | 'large';
    type LeisButtonStyle = "normal" | "outline";
    type LeisElementPosition = "top" | "right" | "left" | "bottom";
    type LeisInputCustomEvent = "active" | "disable";
    type LeisExtensionDefOption = {
        BaseElement: BaseElement,

    }
    type LeisEventNameMap = HTMLElementEventMap;
    type LeisConfirm = true | false;
    type LeisCssStyleDeclaration = CSSStyleDeclaration;

    function create<k extends keyof HTMLElementTagNameMap>(tag: k): HTMLElementTagNameMap[k]

}


