import { ICON } from "./dev/icon.ts"
export declare namespace leistrap {

    interface _Leis<type> {
        /** get the an element  */
        getElement: (element: type) => void;
    }

    interface obj {

        isUndifend: (o: any) => Boolean;
        isArray: (o: any) => Boolean;
        isObject: (o: any) => Boolean;
        isString: (o: any) => Boolean;
        isNumber: (o: any) => Boolean;
        isFunction: (o: any) => Boolean;
        /**
         * removes all content from an array
         */
        setEmptyArray: <arr>(k: arr) => arr;
        isNone: (o: any) => Boolean;
        isEmpty: (o) => Boolean;
        /** verifies in the prop exist to the object */
        has: (prop: any, o: any) => Boolean;

        /** verifies if the prop is an instance of the given object  */
        isTypeOf: <prop, ob>(p: prop, o: ob) => Boolean;

        /**
        * copy the object to the target, if there is no target it returns 
        * a copied object.
        */
        copyObject: <ob, t, ov, ex, res extends ob>
            (o: ob, target: t, overwrite: Boolean, exp: arr<ob>) => res

        /**
         * copy the array to given target. and if there is no target it returns 
         * a copied object
         */
        copyArray: (arr: Array<any>, target, overwrite: Boolean) => Array<any>;
        getUrl: (o) => any;
        hasUrl: (str: string) => Boolean;
        /** removes an item from the given array and returns it */
        arrayRemove: (index, arr) => Array<any>;
        /** replace an array item to new item */
        arrayReplace: (index, value, arr) => any;
        /** inserts a new item */
        arrayInsert: (index, arr, args) => Array<any>;
        tryCode: (callback, error) => any;
        after: (s, func, ...args) => void,
        /** loops through an object */
        loopObj: <ob, val, k extends keyof ob, >
            (obj: ob, callback: (value: val, key: k, index: Number, finished: Boolean) => any) => void;
        bindFunc: (fc, bc) => any;
        arrAddWhen: (arr, item, num1, num2, callback) => void;
        arrBegin: (condi, callback) => void;
        /** lowerCase all object's keys */
        objKeysToLowerCase: <ob>(o: ob) => ob;
        filter: (o: any, callback: any) => any;
        defineObj: (obj, proName, value, writable: Boolean) => void;
        countArray: (arr, offset) => void
    }

    /**
 * Leistrap Module 
 */

    interface LeisElementProp<type> {
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
        style: LeisCssStyleDeclaration;

        /** defines element content, a list of elements or components
         * to be displayed inside of this element
         */
        content: LeisContent;
        getAttr: <k extends keyof type>(name: k) => type[k];
    }

    interface LeisContent {
        length: number;
        add: (items: Array<BaseElement>) => void;
        /**
         * add an index of element
         */
        addIndex: (element: BaseElement) => void;
        /** finds an element by it name */
        findElem: (name: string) => BaseElement | undefined;
        /**remove an element to the main content also from te DOM*/
        remove: (element: BaseElement) => void;
        /** gets and returns all elements which are removed  */
        getRemoved: () => any;

        /** reactive a removed element */
        reactive: (element: BaseElement) => void;
        /** removes all elements */
        empty: () => void;
        /** loops through th content */
        forEach: (clb: (item: BaseElement, index: number) => any) => void
    }

    interface BaseElement extends LeisElementProp<HTMLElement> {
        /** adds an element to the current Element */
        add: (this: BaseElement,
            /** Element to be added */
            element: BaseElement) => void;

        /** adds one or more elements to the current Element */
        addElements: (
            /** element / elements to be added */
            elements: Array<BaseElement>) => void;

        /** sets or update an element Css style property */
        setStyleProp: <p extends keyof LeisCssStyleDeclaration, s = string>(
            /** the CSS property to be updated */
            prop: p,
            /** Value to be assigned to this property */
            value: s) => void;

        getScreen: (option: any) => void;
        removeAll: () => void;
        removeAttr: (name: string) => void;
        removeEvent: (type: keyof LeisEventNameMap, name: string, option: any) => void;
        getRemovedElement: () => void;
        destroy: () => void;
        setText: (text: string) => void;
        getText: () => string;
        render: () => HTMLElement | null;
        show: (css: LeisCssStyleDeclaration) => void;
        CASCADE: () => void;
        addAttr: () => void;
        removeClass: () => void;
        addClass: () => void;
        toggleClass: () => void;
        setStyle: (css: LeisCssStyleDeclaration) => void;
        addEvent: (type: keyof LeisEventNameMap, listener: (e: Event) => void, name: string, option: any) => void;
        remove: () => void;
        setClassName: () => void;
        hide: (css: LeisCssStyleDeclaration) => void;
        bind: () => void;
    }

    // leistrap Elements

    interface LeisElementTableCell extends BaseElement { }
    interface LeisElementTableHead extends BaseElement { }
    interface LeisElementTableBody extends BaseElement { }
    interface LeisElementTableTH extends BaseElement { }
    interface LeisElementTableFoot extends BaseElement { }
    interface LeisElementTableRow extends BaseElement { }

    interface LeisElementButton extends BaseElement {
        getButton: () => LeisComponentButton;
        groupBtn: () => LeisComponentGroupBtn
    }

    interface LeisElementDiv extends BaseElement { }

    interface LeisElementCard extends LeisElementDiv {
        getCard: () => LeisComponentCard
    }

    interface LeisElementHeading extends BaseElement { }
    interface LeisElementTable extends BaseElement {
        getTable: () => LeisComponentTable;
    }

    interface LeisElementImg extends BaseElement {
        src: string;
        alt: string;
    }
    interface LeisElementSpan extends BaseElement { }
    interface LeisElementI extends BaseElement { }

    interface LeisElementInput extends BaseElement {
        getValue: () => string;
        setValue: (value: string) => void;
        getRadio: () => LeisComponentInupNTxt;
        getCheckBox: () => LeisComponentInupNTxt;
        getSwitchBox: () => LeisComponentInupNTxt;

        getTextBox: () => LeisComponentTextBox;
        getPassWordBox: () => LeisComponentPassWordBox;
        getEmailBox: () => LeisComponentEmailBox;

    }

    // leistrap Components
    interface LeisComponentTextBox { }
    interface LeisComponentPassWordBox { }
    interface LeisComponentEmailBox { }


    interface LeisTableOption {
        cell: { elem: BaseElement, cls: string }
        heading: { elem: BaseElement, cls: string }
        row: { elem: BaseElement, cls: string }
        header: { elem: BaseElement, cls: string }
        body: { elem: BaseElement, cls: string }
    }
    type LeisTableData = Array<{
        /** the widget to be added to this current cell */
        widget: BaseElement,
        /** sets the caption of this current cekk */
        text: string
    }>

    interface LeisTableCell {
        add: (element: BaseElement) => void;
        remove: (element: BaseElement) => void;
        removeAll: () => void;
        addAttr: (name: string, value: string) => void;
        addClass: (name: string) => void;
        addEvent: BaseElement["addEvent"];
        removeClass: BaseElement["removeClass"];
        toggleClass: BaseElement['toggleClass'];
        getText: BaseElement["getText"];
        setText: BaseElement["setText"];
        destroy: BaseElement["destroy"];
        spanCol: (colNum: number) => this;
        setStyle: BaseElement["setStyle"];
        spanRow: (rowNum: number) => void;
        span: (cols: number, rows: number) => void;







    }
    interface LeisTableRow extends BaseElement {

    }
    interface LeisTableColumn {

        drop: () => void;
        setStyle: BaseElement["setStyle"];
        addClass: BaseElement["addClass"];
        removeClass: BaseElement["removeClass"];
        toggleClass: BaseElement["toggleClass"];
        getAttr: <k extends keyof HTMLElement>(name: k) => HTMLElement[k];


    }
    interface LeisComponentTable {
        /**
        * create a quick table by enumerating the number of `columns` and `rows`
        */
        insertTable: (
            /** columns number */
            cols: number,
            /**the number of rows to be inserted */
            rows: number,
            option: LeisTableOption
        ) => void;

        /** adds new rows into the table */
        addRow: (
            /** number of rows to be added into the table */
            num: number,
            /** adds data to the new rows added */
            data:
                /** this represents a column */
                Array<LeisTableData>

        ) => void;
        /** inserts data into the table */
        insertData: (
            data: Array<LeisTableData>,
            offset: number,
        ) => void;

        /** gets and returns a table cell according to `colNum` and `rowNum` */
        getCell: (colNum: number, rowNum: Number) => LeisTableCell
        /** gets and returns a row */
        getRow: (num: number) => LeisTableRow;
        /** gets and returns a column */
        getColumn: (num: number) => LeisTableColumn
        /**
         * config the heading 
         */
        setHeading: (headingList: Array<string>) => void;
        /** updates the row  */
        update: (row: number, data: LeisTableData) => void
        setSize: (width: string, height: string) => void
        /**
         * removes the default value
        */
        clear: () => void;

        /**
         * adds a new class name to the table
         */
        addClass: (name: string) => void;
    }
    interface LeisComponentButton {
        setSize: (size: LeisButtonSize) => this;
        setType: (type: LeisColorType) => this;
        setBtnStyle: (style: LeisButtonStyle) => this;
        setIcon: (icClass: ICON) => this;
        setText: (text: string) => this;
        getText: () => string;
        removeEvent: (type: LeisEventNameMap, name: string, option: any) => void;
        destroy: () => void;
        getScreen: () => void;
        on: (type: keyof LeisEventNameMap, listener: (e: Event) => void,
            name: string, option: LeisConfirm) => void;
    }

    interface LeisComponentGroupBtn {
        add: (text: string) => LeisElementID;
        destroy: () => void;
        remove: (ID: LeisElementID) => void;
        setText: (ID: LeisElementID, value: string) => void;
        on: (ID: LeisElementID, event: keyof LeisEventNameMap, listener: (e: Event) => void,
            name: string, option: LeisConfirm) => void;

        removeEvent: (ID: LeisElementID, event: keyof LeisEventNameMap, name: String, option: any) => void;
        removeAll: () => void;
        setBtnSize: (width: string, height: string) => void;
        setType: (color: LeisColorType) => void;
        setSize: (width: string) => void;

    }

    interface LeisComponentCard {

        header: string;
        title: string;
        footer: string;
        img: { path: string, pos: LeisElementPosition };
        setSize: (width: string, height: string) => void;
        destroy: () => void;
        hide: (css: string) => void;
        show: (css: string) => void;
        setBsh: () => void;
        add: (element: BaseElement) => void;
        remove: (element: BaseElement) => void;
        removeAll: () => void;
        render: () => HTMLElement | null;
        changeHeader: (v: string | BaseElement) => void;
        changeFooter: (v: string | BaseElement) => void;
        changeTitle: (value: string) => void;

    }

    interface LeisComponentInupNTxt {
        add: (lbl: string, value: string, parent: BaseElement | null, option: { attr: HTMLInputElement }) => LeisElementID;
        remove: (ID: LeisElementID) => void;
        destroy: () => void;
        once: (ID: LeisElementID, event: LeisInputCustomEvent, listen: () => void) => void;
        getChecked: () => Array<any> | null;
        setLblText: (ID: LeisElementID, value: string) => void;


    }
    // components interfaces

    interface Tooltip {
        /**defines the position od this tooltip */
        postion: LeisElementPosition;
        /** text to be shown */
        text: string
    }

    // option interface
    interface LeisImgOption extends LeisElementProp<HTMLImageElement> {
        src: string;
        alt: string;
    }

    interface LeisSpanOption extends LeisElementProp<HTMLSpanElement> { }
    interface LeisItalicOption extends LeisElementProp<HTMLElement> { }
    interface LeisInputOption extends LeisElementProp<HTMLInputElement> { }
    interface DynCss extends LeisCssStyleDeclaration {

        /** create your amazing StyleSheet declaration */
        DyCss: (style: LeisCssStyleDeclaration) => void;
    }
    interface ExtensionRender {
        push: (listener: (element: BaseElement) => void) => void;
    }
    // config elements
    interface LeisElementID { }

    // types definition

    type LeisColorType = "primary" | "success" | "danger" | "info" | "secondary" | "warning" | "dark" | "light";
    type LeisButtonSize = 'normal' | 'small' | 'large';
    type LeisButtonStyle = "normal" | "outline";
    type LeisElementPosition = "top" | "right" | "left" | "bottom";
    type LeisInputCustomEvent = "active" | "disable";
    type LeisExtensionDefOption = {
        BaseElement: BaseElement,
        ExtensionRender: ExtensionRender,
        leis: _Leis<BaseElement>

    }
    type arr<Type> = Array<keyof Type>
    // API
    interface LeisImportAPI {
        on: (
            /** The imports channel API  */
            channel: string,
            /** the Listener which will invoke the channel name */
            listener: (
                /** the data sended via the exports channel, this could be any type 
                * of data
                     */
                data
            ) => void) => void;
    }
    type LeisEventNameMap = HTMLElementEventMap;
    type LeisConfirm = true | false;
    type LeisCssStyleDeclaration = CSSStyleDeclaration;
    interface LeisObject { }


    // function create<k extends keyof HTMLElementTagNameMap>(tag: k):HTMLElementTagNameMap[k]





    // definition of elements and components
    function Button(option: LeisElementProp<HTMLButtonElement>): LeisElementButton;
    function Div(option: LeisElementProp<HTMLDivElement>): LeisElementDiv;
    function Card(option: LeisElementProp<HTMLDivElement>): LeisElementCard;
    function Card(option: LeisElementProp<HTMLDivElement>): LeisElementCard;

    function H1(option: LeisElementProp<HTMLHeadingElement>): LeisElementHeading;
    function H2(option: LeisElementProp<HTMLHeadingElement>): LeisElementHeading;
    function H3(option: LeisElementProp<HTMLHeadingElement>): LeisElementHeading;
    function H4(option: LeisElementProp<HTMLHeadingElement>): LeisElementHeading;
    function H5(option: LeisElementProp<HTMLHeadingElement>): LeisElementHeading;
    function H6(option: LeisElementProp<HTMLHeadingElement>): LeisElementHeading;

    function Table(option: LeisElementProp<HTMLTableElement>): LeisElementTable;
    function Td(option: LeisElementProp<HTMLTableCellElement>): LeisElementTableCell
    function Tbody(option: LeisElementProp<HTMLTableSectionElement>): LeisElementTableBody;
    function Tr(option: LeisElementProp<HTMLTableRowElement>): LeisElementTableRow;
    function THead(option: LeisElementProp<HTMLTableHeaderCellElement>): LeisElementTableHead;
    function Tfoot(option: LeisElementProp<HTMLTableSectionElement>): LeisElementTableFoot;
    function Th(option: LeisElementProp<HTMLTableSectionElement>): LeisElementTableTH;

    function Img(option: LeisImgOption): LeisElementImg;
    function Span(option: LeisSpanOption): LeisElementSpan;
    function I(option: LeisItalicOption): LeisElementI;
    function Input(option: LeisInputOption): LeisElementInput;
    function whenReady(listener: (
        /** Leistrap entry point */
        this: BaseElement
    ) => void): void;

    function render(id: string): void;
    function set(styleDeclaration): LeisCssStyleDeclaration;
    function imports(path: string): LeisImportAPI;
    function exports(data: any, channel: string): void;
    function defineDynCss(styleDeclaration: DynCss): DynCss;
    var dep: { obj: obj }
    function defineExtension(name: string, listener: (setting: any, leistrap, option: LeisExtensionDefOption) => void): void;

}

