
declare namespace leistrap {

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

    type ICON = 'bi bi-123' | 'bi bi-alarm-fill' | 'bi bi-alarm' | 'bi bi-align-bottom' | 'bi bi-align-center' | 'bi bi-align-end' | 'bi bi-align-middle' | 'bi bi-align-start' | 'bi bi-align-top' | 'bi bi-alt' | 'bi bi-app-indicator' | 'bi bi-app' | 'bi bi-archive-fill' | 'bi bi-archive' | 'bi bi-arrow-90deg-down' | 'bi bi-arrow-90deg-left' | 'bi bi-arrow-90deg-right' | 'bi bi-arrow-90deg-up' | 'bi bi-arrow-bar-down' | 'bi bi-arrow-bar-left' | 'bi bi-arrow-bar-right' | 'bi bi-arrow-bar-up' | 'bi bi-arrow-clockwise' | 'bi bi-arrow-counterclockwise' | 'bi bi-arrow-down-circle-fill' | 'bi bi-arrow-down-circle' | 'bi bi-arrow-down-left-circle-fill' | 'bi bi-arrow-down-left-circle' | 'bi bi-arrow-down-left-square-fill' | 'bi bi-arrow-down-left-square' | 'bi bi-arrow-down-left' | 'bi bi-arrow-down-right-circle-fill' | 'bi bi-arrow-down-right-circle' | 'bi bi-arrow-down-right-square-fill' | 'bi bi-arrow-down-right-square' | 'bi bi-arrow-down-right' | 'bi bi-arrow-down-short' | 'bi bi-arrow-down-square-fill' | 'bi bi-arrow-down-square' | 'bi bi-arrow-down-up' | 'bi bi-arrow-down' | 'bi bi-arrow-left-circle-fill' | 'bi bi-arrow-left-circle' | 'bi bi-arrow-left-right' | 'bi bi-arrow-left-short' | 'bi bi-arrow-left-square-fill' | 'bi bi-arrow-left-square' | 'bi bi-arrow-left' | 'bi bi-arrow-repeat' | 'bi bi-arrow-return-left' | 'bi bi-arrow-return-right' | 'bi bi-arrow-right-circle-fill' | 'bi bi-arrow-right-circle' | 'bi bi-arrow-right-short' | 'bi bi-arrow-right-square-fill' | 'bi bi-arrow-right-square' | 'bi bi-arrow-right' | 'bi bi-arrow-up-circle-fill' | 'bi bi-arrow-up-circle' | 'bi bi-arrow-up-left-circle-fill' | 'bi bi-arrow-up-left-circle' | 'bi bi-arrow-up-left-square-fill' | 'bi bi-arrow-up-left-square' | 'bi bi-arrow-up-left' | 'bi bi-arrow-up-right-circle-fill' | 'bi bi-arrow-up-right-circle' | 'bi bi-arrow-up-right-square-fill' | 'bi bi-arrow-up-right-square' | 'bi bi-arrow-up-right' | 'bi bi-arrow-up-short' | 'bi bi-arrow-up-square-fill' | 'bi bi-arrow-up-square' | 'bi bi-arrow-up' | 'bi bi-arrows-angle-contract' | 'bi bi-arrows-angle-expand' | 'bi bi-arrows-collapse' | 'bi bi-arrows-expand' | 'bi bi-arrows-fullscreen' | 'bi bi-arrows-move' | 'bi bi-aspect-ratio-fill' | 'bi bi-aspect-ratio' | 'bi bi-asterisk' | 'bi bi-at' | 'bi bi-award-fill' | 'bi bi-award' | 'bi bi-back' | 'bi bi-backspace-fill' | 'bi bi-backspace-reverse-fill' | 'bi bi-backspace-reverse' | 'bi bi-backspace' | 'bi bi-badge-3d-fill' | 'bi bi-badge-3d' | 'bi bi-badge-4k-fill' | 'bi bi-badge-4k' | 'bi bi-badge-8k-fill' | 'bi bi-badge-8k' | 'bi bi-badge-ad-fill' | 'bi bi-badge-ad' | 'bi bi-badge-ar-fill' | 'bi bi-badge-ar' | 'bi bi-badge-cc-fill' | 'bi bi-badge-cc' | 'bi bi-badge-hd-fill' | 'bi bi-badge-hd' | 'bi bi-badge-tm-fill' | 'bi bi-badge-tm' | 'bi bi-badge-vo-fill' | 'bi bi-badge-vo' | 'bi bi-badge-vr-fill' | 'bi bi-badge-vr' | 'bi bi-badge-wc-fill' | 'bi bi-badge-wc' | 'bi bi-bag-check-fill' | 'bi bi-bag-check' | 'bi bi-bag-dash-fill' | 'bi bi-bag-dash' | 'bi bi-bag-fill' | 'bi bi-bag-plus-fill' | 'bi bi-bag-plus' | 'bi bi-bag-x-fill' | 'bi bi-bag-x' | 'bi bi-bag' | 'bi bi-bar-chart-fill' | 'bi bi-bar-chart-line-fill' | 'bi bi-bar-chart-line' | 'bi bi-bar-chart-steps' | 'bi bi-bar-chart' | 'bi bi-basket-fill' | 'bi bi-basket' | 'bi bi-basket2-fill' | 'bi bi-basket2' | 'bi bi-basket3-fill' | 'bi bi-basket3' | 'bi bi-battery-charging' | 'bi bi-battery-full' | 'bi bi-battery-half' | 'bi bi-battery' | 'bi bi-bell-fill' | 'bi bi-bell' | 'bi bi-bezier' | 'bi bi-bezier2' | 'bi bi-bicycle' | 'bi bi-binoculars-fill' | 'bi bi-binoculars' | 'bi bi-blockquote-left' | 'bi bi-blockquote-right' | 'bi bi-book-fill' | 'bi bi-book-half' | 'bi bi-book' | 'bi bi-bookmark-check-fill' | 'bi bi-bookmark-check' | 'bi bi-bookmark-dash-fill' | 'bi bi-bookmark-dash' | 'bi bi-bookmark-fill' | 'bi bi-bookmark-heart-fill' | 'bi bi-bookmark-heart' | 'bi bi-bookmark-plus-fill' | 'bi bi-bookmark-plus' | 'bi bi-bookmark-star-fill' | 'bi bi-bookmark-star' | 'bi bi-bookmark-x-fill' | 'bi bi-bookmark-x' | 'bi bi-bookmark' | 'bi bi-bookmarks-fill' | 'bi bi-bookmarks' | 'bi bi-bookshelf' | 'bi bi-bootstrap-fill' | 'bi bi-bootstrap-reboot' | 'bi bi-bootstrap' | 'bi bi-border-all' | 'bi bi-border-bottom' | 'bi bi-border-center' | 'bi bi-border-inner' | 'bi bi-border-left' | 'bi bi-border-middle' | 'bi bi-border-outer' | 'bi bi-border-right' | 'bi bi-border-style' | 'bi bi-border-top' | 'bi bi-border-width' | 'bi bi-border' | 'bi bi-bounding-box-circles' | 'bi bi-bounding-box' | 'bi bi-box-arrow-down-left' | 'bi bi-box-arrow-down-right' | 'bi bi-box-arrow-down' | 'bi bi-box-arrow-in-down-left' | 'bi bi-box-arrow-in-down-right' | 'bi bi-box-arrow-in-down' | 'bi bi-box-arrow-in-left' | 'bi bi-box-arrow-in-right' | 'bi bi-box-arrow-in-up-left' | 'bi bi-box-arrow-in-up-right' | 'bi bi-box-arrow-in-up' | 'bi bi-box-arrow-left' | 'bi bi-box-arrow-right' | 'bi bi-box-arrow-up-left' | 'bi bi-box-arrow-up-right' | 'bi bi-box-arrow-up' | 'bi bi-box-seam' | 'bi bi-box' | 'bi bi-braces' | 'bi bi-bricks' | 'bi bi-briefcase-fill' | 'bi bi-briefcase' | 'bi bi-brightness-alt-high-fill' | 'bi bi-brightness-alt-high' | 'bi bi-brightness-alt-low-fill' | 'bi bi-brightness-alt-low' | 'bi bi-brightness-high-fill' | 'bi bi-brightness-high' | 'bi bi-brightness-low-fill' | 'bi bi-brightness-low' | 'bi bi-broadcast-pin' | 'bi bi-broadcast' | 'bi bi-brush-fill' | 'bi bi-brush' | 'bi bi-bucket-fill' | 'bi bi-bucket' | 'bi bi-bug-fill' | 'bi bi-bug' | 'bi bi-building' | 'bi bi-bullseye' | 'bi bi-calculator-fill' | 'bi bi-calculator' | 'bi bi-calendar-check-fill' | 'bi bi-calendar-check' | 'bi bi-calendar-date-fill' | 'bi bi-calendar-date' | 'bi bi-calendar-day-fill' | 'bi bi-calendar-day' | 'bi bi-calendar-event-fill' | 'bi bi-calendar-event' | 'bi bi-calendar-fill' | 'bi bi-calendar-minus-fill' | 'bi bi-calendar-minus' | 'bi bi-calendar-month-fill' | 'bi bi-calendar-month' | 'bi bi-calendar-plus-fill' | 'bi bi-calendar-plus' | 'bi bi-calendar-range-fill' | 'bi bi-calendar-range' | 'bi bi-calendar-week-fill' | 'bi bi-calendar-week' | 'bi bi-calendar-x-fill' | 'bi bi-calendar-x' | 'bi bi-calendar' | 'bi bi-calendar2-check-fill' | 'bi bi-calendar2-check' | 'bi bi-calendar2-date-fill' | 'bi bi-calendar2-date' | 'bi bi-calendar2-day-fill' | 'bi bi-calendar2-day' | 'bi bi-calendar2-event-fill' | 'bi bi-calendar2-event' | 'bi bi-calendar2-fill' | 'bi bi-calendar2-minus-fill' | 'bi bi-calendar2-minus' | 'bi bi-calendar2-month-fill' | 'bi bi-calendar2-month' | 'bi bi-calendar2-plus-fill' | 'bi bi-calendar2-plus' | 'bi bi-calendar2-range-fill' | 'bi bi-calendar2-range' | 'bi bi-calendar2-week-fill' | 'bi bi-calendar2-week' | 'bi bi-calendar2-x-fill' | 'bi bi-calendar2-x' | 'bi bi-calendar2' | 'bi bi-calendar3-event-fill' | 'bi bi-calendar3-event' | 'bi bi-calendar3-fill' | 'bi bi-calendar3-range-fill' | 'bi bi-calendar3-range' | 'bi bi-calendar3-week-fill' | 'bi bi-calendar3-week' | 'bi bi-calendar3' | 'bi bi-calendar4-event' | 'bi bi-calendar4-range' | 'bi bi-calendar4-week' | 'bi bi-calendar4' | 'bi bi-camera-fill' | 'bi bi-camera-reels-fill' | 'bi bi-camera-reels' | 'bi bi-camera-video-fill' | 'bi bi-camera-video-off-fill' | 'bi bi-camera-video-off' | 'bi bi-camera-video' | 'bi bi-camera' | 'bi bi-camera2' | 'bi bi-capslock-fill' | 'bi bi-capslock' | 'bi bi-card-checklist' | 'bi bi-card-heading' | 'bi bi-card-image' | 'bi bi-card-list' | 'bi bi-card-text' | 'bi bi-caret-down-fill' | 'bi bi-caret-down-square-fill' | 'bi bi-caret-down-square' | 'bi bi-caret-down' | 'bi bi-caret-left-fill' | 'bi bi-caret-left-square-fill' | 'bi bi-caret-left-square' | 'bi bi-caret-left' | 'bi bi-caret-right-fill' | 'bi bi-caret-right-square-fill' | 'bi bi-caret-right-square' | 'bi bi-caret-right' | 'bi bi-caret-up-fill' | 'bi bi-caret-up-square-fill' | 'bi bi-caret-up-square' | 'bi bi-caret-up' | 'bi bi-cart-check-fill' | 'bi bi-cart-check' | 'bi bi-cart-dash-fill' | 'bi bi-cart-dash' | 'bi bi-cart-fill' | 'bi bi-cart-plus-fill' | 'bi bi-cart-plus' | 'bi bi-cart-x-fill' | 'bi bi-cart-x' | 'bi bi-cart' | 'bi bi-cart2' | 'bi bi-cart3' | 'bi bi-cart4' | 'bi bi-cash-stack' | 'bi bi-cash' | 'bi bi-cast' | 'bi bi-chat-dots-fill' | 'bi bi-chat-dots' | 'bi bi-chat-fill' | 'bi bi-chat-left-dots-fill' | 'bi bi-chat-left-dots' | 'bi bi-chat-left-fill' | 'bi bi-chat-left-quote-fill' | 'bi bi-chat-left-quote' | 'bi bi-chat-left-text-fill' | 'bi bi-chat-left-text' | 'bi bi-chat-left' | 'bi bi-chat-quote-fill' | 'bi bi-chat-quote' | 'bi bi-chat-right-dots-fill' | 'bi bi-chat-right-dots' | 'bi bi-chat-right-fill' | 'bi bi-chat-right-quote-fill' | 'bi bi-chat-right-quote' | 'bi bi-chat-right-text-fill' | 'bi bi-chat-right-text' | 'bi bi-chat-right' | 'bi bi-chat-square-dots-fill' | 'bi bi-chat-square-dots' | 'bi bi-chat-square-fill' | 'bi bi-chat-square-quote-fill' | 'bi bi-chat-square-quote' | 'bi bi-chat-square-text-fill' | 'bi bi-chat-square-text' | 'bi bi-chat-square' | 'bi bi-chat-text-fill' | 'bi bi-chat-text' | 'bi bi-chat' | 'bi bi-check-all' | 'bi bi-check-circle-fill' | 'bi bi-check-circle' | 'bi bi-check-square-fill' | 'bi bi-check-square' | 'bi bi-check' | 'bi bi-check2-all' | 'bi bi-check2-circle' | 'bi bi-check2-square' | 'bi bi-check2' | 'bi bi-chevron-bar-contract' | 'bi bi-chevron-bar-down' | 'bi bi-chevron-bar-expand' | 'bi bi-chevron-bar-left' | 'bi bi-chevron-bar-right' | 'bi bi-chevron-bar-up' | 'bi bi-chevron-compact-down' | 'bi bi-chevron-compact-left' | 'bi bi-chevron-compact-right' | 'bi bi-chevron-compact-up' | 'bi bi-chevron-contract' | 'bi bi-chevron-double-down' | 'bi bi-chevron-double-left' | 'bi bi-chevron-double-right' | 'bi bi-chevron-double-up' | 'bi bi-chevron-down' | 'bi bi-chevron-expand' | 'bi bi-chevron-left' | 'bi bi-chevron-right' | 'bi bi-chevron-up' | 'bi bi-circle-fill' | 'bi bi-circle-half' | 'bi bi-circle-square' | 'bi bi-circle' | 'bi bi-clipboard-check' | 'bi bi-clipboard-data' | 'bi bi-clipboard-minus' | 'bi bi-clipboard-plus' | 'bi bi-clipboard-x' | 'bi bi-clipboard' | 'bi bi-clock-fill' | 'bi bi-clock-history' | 'bi bi-clock' | 'bi bi-cloud-arrow-down-fill' | 'bi bi-cloud-arrow-down' | 'bi bi-cloud-arrow-up-fill' | 'bi bi-cloud-arrow-up' | 'bi bi-cloud-check-fill' | 'bi bi-cloud-check' | 'bi bi-cloud-download-fill' | 'bi bi-cloud-download' | 'bi bi-cloud-drizzle-fill' | 'bi bi-cloud-drizzle' | 'bi bi-cloud-fill' | 'bi bi-cloud-fog-fill' | 'bi bi-cloud-fog' | 'bi bi-cloud-fog2-fill' | 'bi bi-cloud-fog2' | 'bi bi-cloud-hail-fill' | 'bi bi-cloud-hail' | 'bi bi-cloud-haze-fill' | 'bi bi-cloud-haze' | 'bi bi-cloud-haze2-fill' | 'bi bi-cloud-lightning-fill' | 'bi bi-cloud-lightning-rain-fill' | 'bi bi-cloud-lightning-rain' | 'bi bi-cloud-lightning' | 'bi bi-cloud-minus-fill' | 'bi bi-cloud-minus' | 'bi bi-cloud-moon-fill' | 'bi bi-cloud-moon' | 'bi bi-cloud-plus-fill' | 'bi bi-cloud-plus' | 'bi bi-cloud-rain-fill' | 'bi bi-cloud-rain-heavy-fill' | 'bi bi-cloud-rain-heavy' | 'bi bi-cloud-rain' | 'bi bi-cloud-slash-fill' | 'bi bi-cloud-slash' | 'bi bi-cloud-sleet-fill' | 'bi bi-cloud-sleet' | 'bi bi-cloud-snow-fill' | 'bi bi-cloud-snow' | 'bi bi-cloud-sun-fill' | 'bi bi-cloud-sun' | 'bi bi-cloud-upload-fill' | 'bi bi-cloud-upload' | 'bi bi-cloud' | 'bi bi-clouds-fill' | 'bi bi-clouds' | 'bi bi-cloudy-fill' | 'bi bi-cloudy' | 'bi bi-code-slash' | 'bi bi-code-square' | 'bi bi-code' | 'bi bi-collection-fill' | 'bi bi-collection-play-fill' | 'bi bi-collection-play' | 'bi bi-collection' | 'bi bi-columns-gap' | 'bi bi-columns' | 'bi bi-command' | 'bi bi-compass-fill' | 'bi bi-compass' | 'bi bi-cone-striped' | 'bi bi-cone' | 'bi bi-controller' | 'bi bi-cpu-fill' | 'bi bi-cpu' | 'bi bi-credit-card-2-back-fill' | 'bi bi-credit-card-2-back' | 'bi bi-credit-card-2-front-fill' | 'bi bi-credit-card-2-front' | 'bi bi-credit-card-fill' | 'bi bi-credit-card' | 'bi bi-crop' | 'bi bi-cup-fill' | 'bi bi-cup-straw' | 'bi bi-cup' | 'bi bi-cursor-fill' | 'bi bi-cursor-text' | 'bi bi-cursor' | 'bi bi-dash-circle-dotted' | 'bi bi-dash-circle-fill' | 'bi bi-dash-circle' | 'bi bi-dash-square-dotted' | 'bi bi-dash-square-fill' | 'bi bi-dash-square' | 'bi bi-dash' | 'bi bi-diagram-2-fill' | 'bi bi-diagram-2' | 'bi bi-diagram-3-fill' | 'bi bi-diagram-3' | 'bi bi-diamond-fill' | 'bi bi-diamond-half' | 'bi bi-diamond' | 'bi bi-dice-1-fill' | 'bi bi-dice-1' | 'bi bi-dice-2-fill' | 'bi bi-dice-2' | 'bi bi-dice-3-fill' | 'bi bi-dice-3' | 'bi bi-dice-4-fill' | 'bi bi-dice-4' | 'bi bi-dice-5-fill' | 'bi bi-dice-5' | 'bi bi-dice-6-fill' | 'bi bi-dice-6' | 'bi bi-disc-fill' | 'bi bi-disc' | 'bi bi-discord' | 'bi bi-display-fill' | 'bi bi-display' | 'bi bi-distribute-horizontal' | 'bi bi-distribute-vertical' | 'bi bi-door-closed-fill' | 'bi bi-door-closed' | 'bi bi-door-open-fill' | 'bi bi-door-open' | 'bi bi-dot' | 'bi bi-download' | 'bi bi-droplet-fill' | 'bi bi-droplet-half' | 'bi bi-droplet' | 'bi bi-earbuds' | 'bi bi-easel-fill' | 'bi bi-easel' | 'bi bi-egg-fill' | 'bi bi-egg-fried' | 'bi bi-egg' | 'bi bi-eject-fill' | 'bi bi-eject' | 'bi bi-emoji-angry-fill' | 'bi bi-emoji-angry' | 'bi bi-emoji-dizzy-fill' | 'bi bi-emoji-dizzy' | 'bi bi-emoji-expressionless-fill' | 'bi bi-emoji-expressionless' | 'bi bi-emoji-frown-fill' | 'bi bi-emoji-frown' | 'bi bi-emoji-heart-eyes-fill' | 'bi bi-emoji-heart-eyes' | 'bi bi-emoji-laughing-fill' | 'bi bi-emoji-laughing' | 'bi bi-emoji-neutral-fill' | 'bi bi-emoji-neutral' | 'bi bi-emoji-smile-fill' | 'bi bi-emoji-smile-upside-down-fill' | 'bi bi-emoji-smile-upside-down' | 'bi bi-emoji-smile' | 'bi bi-emoji-sunglasses-fill' | 'bi bi-emoji-sunglasses' | 'bi bi-emoji-wink-fill' | 'bi bi-emoji-wink' | 'bi bi-envelope-fill' | 'bi bi-envelope-open-fill' | 'bi bi-envelope-open' | 'bi bi-envelope' | 'bi bi-eraser-fill' | 'bi bi-eraser' | 'bi bi-exclamation-circle-fill' | 'bi bi-exclamation-circle' | 'bi bi-exclamation-diamond-fill' | 'bi bi-exclamation-diamond' | 'bi bi-exclamation-octagon-fill' | 'bi bi-exclamation-octagon' | 'bi bi-exclamation-square-fill' | 'bi bi-exclamation-square' | 'bi bi-exclamation-triangle-fill' | 'bi bi-exclamation-triangle' | 'bi bi-exclamation' | 'bi bi-exclude' | 'bi bi-eye-fill' | 'bi bi-eye-slash-fill' | 'bi bi-eye-slash' | 'bi bi-eye' | 'bi bi-eyedropper' | 'bi bi-eyeglasses' | 'bi bi-facebook' | 'bi bi-file-arrow-down-fill' | 'bi bi-file-arrow-down' | 'bi bi-file-arrow-up-fill' | 'bi bi-file-arrow-up' | 'bi bi-file-bar-graph-fill' | 'bi bi-file-bar-graph' | 'bi bi-file-binary-fill' | 'bi bi-file-binary' | 'bi bi-file-break-fill' | 'bi bi-file-break' | 'bi bi-file-check-fill' | 'bi bi-file-check' | 'bi bi-file-code-fill' | 'bi bi-file-code' | 'bi bi-file-diff-fill' | 'bi bi-file-diff' | 'bi bi-file-earmark-arrow-down-fill' | 'bi bi-file-earmark-arrow-down' | 'bi bi-file-earmark-arrow-up-fill' | 'bi bi-file-earmark-arrow-up' | 'bi bi-file-earmark-bar-graph-fill' | 'bi bi-file-earmark-bar-graph' | 'bi bi-file-earmark-binary-fill' | 'bi bi-file-earmark-binary' | 'bi bi-file-earmark-break-fill' | 'bi bi-file-earmark-break' | 'bi bi-file-earmark-check-fill' | 'bi bi-file-earmark-check' | 'bi bi-file-earmark-code-fill' | 'bi bi-file-earmark-code' | 'bi bi-file-earmark-diff-fill' | 'bi bi-file-earmark-diff' | 'bi bi-file-earmark-easel-fill' | 'bi bi-file-earmark-easel' | 'bi bi-file-earmark-excel-fill' | 'bi bi-file-earmark-excel' | 'bi bi-file-earmark-fill' | 'bi bi-file-earmark-font-fill' | 'bi bi-file-earmark-font' | 'bi bi-file-earmark-image-fill' | 'bi bi-file-earmark-image' | 'bi bi-file-earmark-lock-fill' | 'bi bi-file-earmark-lock' | 'bi bi-file-earmark-lock2-fill' | 'bi bi-file-earmark-lock2' | 'bi bi-file-earmark-medical-fill' | 'bi bi-file-earmark-medical' | 'bi bi-file-earmark-minus-fill' | 'bi bi-file-earmark-minus' | 'bi bi-file-earmark-music-fill' | 'bi bi-file-earmark-music' | 'bi bi-file-earmark-person-fill' | 'bi bi-file-earmark-person' | 'bi bi-file-earmark-play-fill' | 'bi bi-file-earmark-play' | 'bi bi-file-earmark-plus-fill' | 'bi bi-file-earmark-plus' | 'bi bi-file-earmark-post-fill' | 'bi bi-file-earmark-post' | 'bi bi-file-earmark-ppt-fill' | 'bi bi-file-earmark-ppt' | 'bi bi-file-earmark-richtext-fill' | 'bi bi-file-earmark-richtext' | 'bi bi-file-earmark-ruled-fill' | 'bi bi-file-earmark-ruled' | 'bi bi-file-earmark-slides-fill' | 'bi bi-file-earmark-slides' | 'bi bi-file-earmark-spreadsheet-fill' | 'bi bi-file-earmark-spreadsheet' | 'bi bi-file-earmark-text-fill' | 'bi bi-file-earmark-text' | 'bi bi-file-earmark-word-fill' | 'bi bi-file-earmark-word' | 'bi bi-file-earmark-x-fill' | 'bi bi-file-earmark-x' | 'bi bi-file-earmark-zip-fill' | 'bi bi-file-earmark-zip' | 'bi bi-file-earmark' | 'bi bi-file-easel-fill' | 'bi bi-file-easel' | 'bi bi-file-excel-fill' | 'bi bi-file-excel' | 'bi bi-file-fill' | 'bi bi-file-font-fill' | 'bi bi-file-font' | 'bi bi-file-image-fill' | 'bi bi-file-image' | 'bi bi-file-lock-fill' | 'bi bi-file-lock' | 'bi bi-file-lock2-fill' | 'bi bi-file-lock2' | 'bi bi-file-medical-fill' | 'bi bi-file-medical' | 'bi bi-file-minus-fill' | 'bi bi-file-minus' | 'bi bi-file-music-fill' | 'bi bi-file-music' | 'bi bi-file-person-fill' | 'bi bi-file-person' | 'bi bi-file-play-fill' | 'bi bi-file-play' | 'bi bi-file-plus-fill' | 'bi bi-file-plus' | 'bi bi-file-post-fill' | 'bi bi-file-post' | 'bi bi-file-ppt-fill' | 'bi bi-file-ppt' | 'bi bi-file-richtext-fill' | 'bi bi-file-richtext' | 'bi bi-file-ruled-fill' | 'bi bi-file-ruled' | 'bi bi-file-slides-fill' | 'bi bi-file-slides' | 'bi bi-file-spreadsheet-fill' | 'bi bi-file-spreadsheet' | 'bi bi-file-text-fill' | 'bi bi-file-text' | 'bi bi-file-word-fill' | 'bi bi-file-word' | 'bi bi-file-x-fill' | 'bi bi-file-x' | 'bi bi-file-zip-fill' | 'bi bi-file-zip' | 'bi bi-file' | 'bi bi-files-alt' | 'bi bi-files' | 'bi bi-film' | 'bi bi-filter-circle-fill' | 'bi bi-filter-circle' | 'bi bi-filter-left' | 'bi bi-filter-right' | 'bi bi-filter-square-fill' | 'bi bi-filter-square' | 'bi bi-filter' | 'bi bi-flag-fill' | 'bi bi-flag' | 'bi bi-flower1' | 'bi bi-flower2' | 'bi bi-flower3' | 'bi bi-folder-check' | 'bi bi-folder-fill' | 'bi bi-folder-minus' | 'bi bi-folder-plus' | 'bi bi-folder-symlink-fill' | 'bi bi-folder-symlink' | 'bi bi-folder-x' | 'bi bi-folder' | 'bi bi-folder2-open' | 'bi bi-folder2' | 'bi bi-fonts' | 'bi bi-forward-fill' | 'bi bi-forward' | 'bi bi-front' | 'bi bi-fullscreen-exit' | 'bi bi-fullscreen' | 'bi bi-funnel-fill' | 'bi bi-funnel' | 'bi bi-gear-fill' | 'bi bi-gear-wide-connected' | 'bi bi-gear-wide' | 'bi bi-gear' | 'bi bi-gem' | 'bi bi-geo-alt-fill' | 'bi bi-geo-alt' | 'bi bi-geo-fill' | 'bi bi-geo' | 'bi bi-gift-fill' | 'bi bi-gift' | 'bi bi-github' | 'bi bi-globe' | 'bi bi-globe2' | 'bi bi-google' | 'bi bi-graph-down' | 'bi bi-graph-up' | 'bi bi-grid-1x2-fill' | 'bi bi-grid-1x2' | 'bi bi-grid-3x2-gap-fill' | 'bi bi-grid-3x2-gap' | 'bi bi-grid-3x2' | 'bi bi-grid-3x3-gap-fill' | 'bi bi-grid-3x3-gap' | 'bi bi-grid-3x3' | 'bi bi-grid-fill' | 'bi bi-grid' | 'bi bi-grip-horizontal' | 'bi bi-grip-vertical' | 'bi bi-hammer' | 'bi bi-hand-index-fill' | 'bi bi-hand-index-thumb-fill' | 'bi bi-hand-index-thumb' | 'bi bi-hand-index' | 'bi bi-hand-thumbs-down-fill' | 'bi bi-hand-thumbs-down' | 'bi bi-hand-thumbs-up-fill' | 'bi bi-hand-thumbs-up' | 'bi bi-handbag-fill' | 'bi bi-handbag' | 'bi bi-hash' | 'bi bi-hdd-fill' | 'bi bi-hdd-network-fill' | 'bi bi-hdd-network' | 'bi bi-hdd-rack-fill' | 'bi bi-hdd-rack' | 'bi bi-hdd-stack-fill' | 'bi bi-hdd-stack' | 'bi bi-hdd' | 'bi bi-headphones' | 'bi bi-headset' | 'bi bi-heart-fill' | 'bi bi-heart-half' | 'bi bi-heart' | 'bi bi-heptagon-fill' | 'bi bi-heptagon-half' | 'bi bi-heptagon' | 'bi bi-hexagon-fill' | 'bi bi-hexagon-half' | 'bi bi-hexagon' | 'bi bi-hourglass-bottom' | 'bi bi-hourglass-split' | 'bi bi-hourglass-top' | 'bi bi-hourglass' | 'bi bi-house-door-fill' | 'bi bi-house-door' | 'bi bi-house-fill' | 'bi bi-house' | 'bi bi-hr' | 'bi bi-hurricane' | 'bi bi-image-alt' | 'bi bi-image-fill' | 'bi bi-image' | 'bi bi-images' | 'bi bi-inbox-fill' | 'bi bi-inbox' | 'bi bi-inboxes-fill' | 'bi bi-inboxes' | 'bi bi-info-circle-fill' | 'bi bi-info-circle' | 'bi bi-info-square-fill' | 'bi bi-info-square' | 'bi bi-info' | 'bi bi-input-cursor-text' | 'bi bi-input-cursor' | 'bi bi-instagram' | 'bi bi-intersect' | 'bi bi-journal-album' | 'bi bi-journal-arrow-down' | 'bi bi-journal-arrow-up' | 'bi bi-journal-bookmark-fill' | 'bi bi-journal-bookmark' | 'bi bi-journal-check' | 'bi bi-journal-code' | 'bi bi-journal-medical' | 'bi bi-journal-minus' | 'bi bi-journal-plus' | 'bi bi-journal-richtext' | 'bi bi-journal-text' | 'bi bi-journal-x' | 'bi bi-journal' | 'bi bi-journals' | 'bi bi-joystick' | 'bi bi-justify-left' | 'bi bi-justify-right' | 'bi bi-justify' | 'bi bi-kanban-fill' | 'bi bi-kanban' | 'bi bi-key-fill' | 'bi bi-key' | 'bi bi-keyboard-fill' | 'bi bi-keyboard' | 'bi bi-ladder' | 'bi bi-lamp-fill' | 'bi bi-lamp' | 'bi bi-laptop-fill' | 'bi bi-laptop' | 'bi bi-layer-backward' | 'bi bi-layer-forward' | 'bi bi-layers-fill' | 'bi bi-layers-half' | 'bi bi-layers' | 'bi bi-layout-sidebar-inset-reverse' | 'bi bi-layout-sidebar-inset' | 'bi bi-layout-sidebar-reverse' | 'bi bi-layout-sidebar' | 'bi bi-layout-split' | 'bi bi-layout-text-sidebar-reverse' | 'bi bi-layout-text-sidebar' | 'bi bi-layout-text-window-reverse' | 'bi bi-layout-text-window' | 'bi bi-layout-three-columns' | 'bi bi-layout-wtf' | 'bi bi-life-preserver' | 'bi bi-lightbulb-fill' | 'bi bi-lightbulb-off-fill' | 'bi bi-lightbulb-off' | 'bi bi-lightbulb' | 'bi bi-lightning-charge-fill' | 'bi bi-lightning-charge' | 'bi bi-lightning-fill' | 'bi bi-lightning' | 'bi bi-link-45deg' | 'bi bi-link' | 'bi bi-linkedin' | 'bi bi-list-check' | 'bi bi-list-nested' | 'bi bi-list-ol' | 'bi bi-list-stars' | 'bi bi-list-task' | 'bi bi-list-ul' | 'bi bi-list' | 'bi bi-lock-fill' | 'bi bi-lock' | 'bi bi-mailbox' | 'bi bi-mailbox2' | 'bi bi-map-fill' | 'bi bi-map' | 'bi bi-markdown-fill' | 'bi bi-markdown' | 'bi bi-mask' | 'bi bi-megaphone-fill' | 'bi bi-megaphone' | 'bi bi-menu-app-fill' | 'bi bi-menu-app' | 'bi bi-menu-button-fill' | 'bi bi-menu-button-wide-fill' | 'bi bi-menu-button-wide' | 'bi bi-menu-button' | 'bi bi-menu-down' | 'bi bi-menu-up' | 'bi bi-mic-fill' | 'bi bi-mic-mute-fill' | 'bi bi-mic-mute' | 'bi bi-mic' | 'bi bi-minecart-loaded' | 'bi bi-minecart' | 'bi bi-moisture' | 'bi bi-moon-fill' | 'bi bi-moon-stars-fill' | 'bi bi-moon-stars' | 'bi bi-moon' | 'bi bi-mouse-fill' | 'bi bi-mouse' | 'bi bi-mouse2-fill' | 'bi bi-mouse2' | 'bi bi-mouse3-fill' | 'bi bi-mouse3' | 'bi bi-music-note-beamed' | 'bi bi-music-note-list' | 'bi bi-music-note' | 'bi bi-music-player-fill' | 'bi bi-music-player' | 'bi bi-newspaper' | 'bi bi-node-minus-fill' | 'bi bi-node-minus' | 'bi bi-node-plus-fill' | 'bi bi-node-plus' | 'bi bi-nut-fill' | 'bi bi-nut' | 'bi bi-octagon-fill' | 'bi bi-octagon-half' | 'bi bi-octagon' | 'bi bi-option' | 'bi bi-outlet' | 'bi bi-paint-bucket' | 'bi bi-palette-fill' | 'bi bi-palette' | 'bi bi-palette2' | 'bi bi-paperclip' | 'bi bi-paragraph' | 'bi bi-patch-check-fill' | 'bi bi-patch-check' | 'bi bi-patch-exclamation-fill' | 'bi bi-patch-exclamation' | 'bi bi-patch-minus-fill' | 'bi bi-patch-minus' | 'bi bi-patch-plus-fill' | 'bi bi-patch-plus' | 'bi bi-patch-question-fill' | 'bi bi-patch-question' | 'bi bi-pause-btn-fill' | 'bi bi-pause-btn' | 'bi bi-pause-circle-fill' | 'bi bi-pause-circle' | 'bi bi-pause-fill' | 'bi bi-pause' | 'bi bi-peace-fill' | 'bi bi-peace' | 'bi bi-pen-fill' | 'bi bi-pen' | 'bi bi-pencil-fill' | 'bi bi-pencil-square' | 'bi bi-pencil' | 'bi bi-pentagon-fill' | 'bi bi-pentagon-half' | 'bi bi-pentagon' | 'bi bi-people-fill' | 'bi bi-people' | 'bi bi-percent' | 'bi bi-person-badge-fill' | 'bi bi-person-badge' | 'bi bi-person-bounding-box' | 'bi bi-person-check-fill' | 'bi bi-person-check' | 'bi bi-person-circle' | 'bi bi-person-dash-fill' | 'bi bi-person-dash' | 'bi bi-person-fill' | 'bi bi-person-lines-fill' | 'bi bi-person-plus-fill' | 'bi bi-person-plus' | 'bi bi-person-square' | 'bi bi-person-x-fill' | 'bi bi-person-x' | 'bi bi-person' | 'bi bi-phone-fill' | 'bi bi-phone-landscape-fill' | 'bi bi-phone-landscape' | 'bi bi-phone-vibrate-fill' | 'bi bi-phone-vibrate' | 'bi bi-phone' | 'bi bi-pie-chart-fill' | 'bi bi-pie-chart' | 'bi bi-pin-angle-fill' | 'bi bi-pin-angle' | 'bi bi-pin-fill' | 'bi bi-pin' | 'bi bi-pip-fill' | 'bi bi-pip' | 'bi bi-play-btn-fill' | 'bi bi-play-btn' | 'bi bi-play-circle-fill' | 'bi bi-play-circle' | 'bi bi-play-fill' | 'bi bi-play' | 'bi bi-plug-fill' | 'bi bi-plug' | 'bi bi-plus-circle-dotted' | 'bi bi-plus-circle-fill' | 'bi bi-plus-circle' | 'bi bi-plus-square-dotted' | 'bi bi-plus-square-fill' | 'bi bi-plus-square' | 'bi bi-plus' | 'bi bi-power' | 'bi bi-printer-fill' | 'bi bi-printer' | 'bi bi-puzzle-fill' | 'bi bi-puzzle' | 'bi bi-question-circle-fill' | 'bi bi-question-circle' | 'bi bi-question-diamond-fill' | 'bi bi-question-diamond' | 'bi bi-question-octagon-fill' | 'bi bi-question-octagon' | 'bi bi-question-square-fill' | 'bi bi-question-square' | 'bi bi-question' | 'bi bi-rainbow' | 'bi bi-receipt-cutoff' | 'bi bi-receipt' | 'bi bi-reception-0' | 'bi bi-reception-1' | 'bi bi-reception-2' | 'bi bi-reception-3' | 'bi bi-reception-4' | 'bi bi-record-btn-fill' | 'bi bi-record-btn' | 'bi bi-record-circle-fill' | 'bi bi-record-circle' | 'bi bi-record-fill' | 'bi bi-record' | 'bi bi-record2-fill' | 'bi bi-record2' | 'bi bi-reply-all-fill' | 'bi bi-reply-all' | 'bi bi-reply-fill' | 'bi bi-reply' | 'bi bi-rss-fill' | 'bi bi-rss' | 'bi bi-rulers' | 'bi bi-save-fill' | 'bi bi-save' | 'bi bi-save2-fill' | 'bi bi-save2' | 'bi bi-scissors' | 'bi bi-screwdriver' | 'bi bi-search' | 'bi bi-segmented-nav' | 'bi bi-server' | 'bi bi-share-fill' | 'bi bi-share' | 'bi bi-shield-check' | 'bi bi-shield-exclamation' | 'bi bi-shield-fill-check' | 'bi bi-shield-fill-exclamation' | 'bi bi-shield-fill-minus' | 'bi bi-shield-fill-plus' | 'bi bi-shield-fill-x' | 'bi bi-shield-fill' | 'bi bi-shield-lock-fill' | 'bi bi-shield-lock' | 'bi bi-shield-minus' | 'bi bi-shield-plus' | 'bi bi-shield-shaded' | 'bi bi-shield-slash-fill' | 'bi bi-shield-slash' | 'bi bi-shield-x' | 'bi bi-shield' | 'bi bi-shift-fill' | 'bi bi-shift' | 'bi bi-shop-window' | 'bi bi-shop' | 'bi bi-shuffle' | 'bi bi-signpost-2-fill' | 'bi bi-signpost-2' | 'bi bi-signpost-fill' | 'bi bi-signpost-split-fill' | 'bi bi-signpost-split' | 'bi bi-signpost' | 'bi bi-sim-fill' | 'bi bi-sim' | 'bi bi-skip-backward-btn-fill' | 'bi bi-skip-backward-btn' | 'bi bi-skip-backward-circle-fill' | 'bi bi-skip-backward-circle' | 'bi bi-skip-backward-fill' | 'bi bi-skip-backward' | 'bi bi-skip-end-btn-fill' | 'bi bi-skip-end-btn' | 'bi bi-skip-end-circle-fill' | 'bi bi-skip-end-circle' | 'bi bi-skip-end-fill' | 'bi bi-skip-end' | 'bi bi-skip-forward-btn-fill' | 'bi bi-skip-forward-btn' | 'bi bi-skip-forward-circle-fill' | 'bi bi-skip-forward-circle' | 'bi bi-skip-forward-fill' | 'bi bi-skip-forward' | 'bi bi-skip-start-btn-fill' | 'bi bi-skip-start-btn' | 'bi bi-skip-start-circle-fill' | 'bi bi-skip-start-circle' | 'bi bi-skip-start-fill' | 'bi bi-skip-start' | 'bi bi-slack' | 'bi bi-slash-circle-fill' | 'bi bi-slash-circle' | 'bi bi-slash-square-fill' | 'bi bi-slash-square' | 'bi bi-slash' | 'bi bi-sliders' | 'bi bi-smartwatch' | 'bi bi-snow' | 'bi bi-snow2' | 'bi bi-snow3' | 'bi bi-sort-alpha-down-alt' | 'bi bi-sort-alpha-down' | 'bi bi-sort-alpha-up-alt' | 'bi bi-sort-alpha-up' | 'bi bi-sort-down-alt' | 'bi bi-sort-down' | 'bi bi-sort-numeric-down-alt' | 'bi bi-sort-numeric-down' | 'bi bi-sort-numeric-up-alt' | 'bi bi-sort-numeric-up' | 'bi bi-sort-up-alt' | 'bi bi-sort-up' | 'bi bi-soundwave' | 'bi bi-speaker-fill' | 'bi bi-speaker' | 'bi bi-speedometer' | 'bi bi-speedometer2' | 'bi bi-spellcheck' | 'bi bi-square-fill' | 'bi bi-square-half' | 'bi bi-square' | 'bi bi-stack' | 'bi bi-star-fill' | 'bi bi-star-half' | 'bi bi-star' | 'bi bi-stars' | 'bi bi-stickies-fill' | 'bi bi-stickies' | 'bi bi-sticky-fill' | 'bi bi-sticky' | 'bi bi-stop-btn-fill' | 'bi bi-stop-btn' | 'bi bi-stop-circle-fill' | 'bi bi-stop-circle' | 'bi bi-stop-fill' | 'bi bi-stop' | 'bi bi-stoplights-fill' | 'bi bi-stoplights' | 'bi bi-stopwatch-fill' | 'bi bi-stopwatch' | 'bi bi-subtract' | 'bi bi-suit-club-fill' | 'bi bi-suit-club' | 'bi bi-suit-diamond-fill' | 'bi bi-suit-diamond' | 'bi bi-suit-heart-fill' | 'bi bi-suit-heart' | 'bi bi-suit-spade-fill' | 'bi bi-suit-spade' | 'bi bi-sun-fill' | 'bi bi-sun' | 'bi bi-sunglasses' | 'bi bi-sunrise-fill' | 'bi bi-sunrise' | 'bi bi-sunset-fill' | 'bi bi-sunset' | 'bi bi-symmetry-horizontal' | 'bi bi-symmetry-vertical' | 'bi bi-table' | 'bi bi-tablet-fill' | 'bi bi-tablet-landscape-fill' | 'bi bi-tablet-landscape' | 'bi bi-tablet' | 'bi bi-tag-fill' | 'bi bi-tag' | 'bi bi-tags-fill' | 'bi bi-tags' | 'bi bi-telegram' | 'bi bi-telephone-fill' | 'bi bi-telephone-forward-fill' | 'bi bi-telephone-forward' | 'bi bi-telephone-inbound-fill' | 'bi bi-telephone-inbound' | 'bi bi-telephone-minus-fill' | 'bi bi-telephone-minus' | 'bi bi-telephone-outbound-fill' | 'bi bi-telephone-outbound' | 'bi bi-telephone-plus-fill' | 'bi bi-telephone-plus' | 'bi bi-telephone-x-fill' | 'bi bi-telephone-x' | 'bi bi-telephone' | 'bi bi-terminal-fill' | 'bi bi-terminal' | 'bi bi-text-center' | 'bi bi-text-indent-left' | 'bi bi-text-indent-right' | 'bi bi-text-left' | 'bi bi-text-paragraph' | 'bi bi-text-right' | 'bi bi-textarea-resize' | 'bi bi-textarea-t' | 'bi bi-textarea' | 'bi bi-thermometer-half' | 'bi bi-thermometer-high' | 'bi bi-thermometer-low' | 'bi bi-thermometer-snow' | 'bi bi-thermometer-sun' | 'bi bi-thermometer' | 'bi bi-three-dots-vertical' | 'bi bi-three-dots' | 'bi bi-toggle-off' | 'bi bi-toggle-on' | 'bi bi-toggle2-off' | 'bi bi-toggle2-on' | 'bi bi-toggles' | 'bi bi-toggles2' | 'bi bi-tools' | 'bi bi-tornado' | 'bi bi-trash-fill' | 'bi bi-trash' | 'bi bi-trash2-fill' | 'bi bi-trash2' | 'bi bi-tree-fill' | 'bi bi-tree' | 'bi bi-triangle-fill' | 'bi bi-triangle-half' | 'bi bi-triangle' | 'bi bi-trophy-fill' | 'bi bi-trophy' | 'bi bi-tropical-storm' | 'bi bi-truck-flatbed' | 'bi bi-truck' | 'bi bi-tsunami' | 'bi bi-tv-fill' | 'bi bi-tv' | 'bi bi-twitch' | 'bi bi-twitter' | 'bi bi-type-bold' | 'bi bi-type-h1' | 'bi bi-type-h2' | 'bi bi-type-h3' | 'bi bi-type-italic' | 'bi bi-type-strikethrough' | 'bi bi-type-underline' | 'bi bi-type' | 'bi bi-ui-checks-grid' | 'bi bi-ui-checks' | 'bi bi-ui-radios-grid' | 'bi bi-ui-radios' | 'bi bi-umbrella-fill' | 'bi bi-umbrella' | 'bi bi-union' | 'bi bi-unlock-fill' | 'bi bi-unlock' | 'bi bi-upc-scan' | 'bi bi-upc' | 'bi bi-upload' | 'bi bi-vector-pen' | 'bi bi-view-list' | 'bi bi-view-stacked' | 'bi bi-vinyl-fill' | 'bi bi-vinyl' | 'bi bi-voicemail' | 'bi bi-volume-down-fill' | 'bi bi-volume-down' | 'bi bi-volume-mute-fill' | 'bi bi-volume-mute' | 'bi bi-volume-off-fill' | 'bi bi-volume-off' | 'bi bi-volume-up-fill' | 'bi bi-volume-up' | 'bi bi-vr' | 'bi bi-wallet-fill' | 'bi bi-wallet' | 'bi bi-wallet2' | 'bi bi-watch' | 'bi bi-water' | 'bi bi-whatsapp' | 'bi bi-wifi-1' | 'bi bi-wifi-2' | 'bi bi-wifi-off' | 'bi bi-wifi' | 'bi bi-wind' | 'bi bi-window-dock' | 'bi bi-window-sidebar' | 'bi bi-window' | 'bi bi-wrench' | 'bi bi-x-circle-fill' | 'bi bi-x-circle' | 'bi bi-x-diamond-fill' | 'bi bi-x-diamond' | 'bi bi-x-octagon-fill' | 'bi bi-x-octagon' | 'bi bi-x-square-fill' | 'bi bi-x-square' | 'bi bi-x' | 'bi bi-youtube' | 'bi bi-zoom-in' | 'bi bi-zoom-out' | 'bi bi-bank' | 'bi bi-bank2' | 'bi bi-bell-slash-fill' | 'bi bi-bell-slash' | 'bi bi-cash-coin' | 'bi bi-check-lg' | 'bi bi-coin' | 'bi bi-currency-bitcoin' | 'bi bi-currency-dollar' | 'bi bi-currency-euro' | 'bi bi-currency-exchange' | 'bi bi-currency-pound' | 'bi bi-currency-yen' | 'bi bi-dash-lg' | 'bi bi-exclamation-lg' | 'bi bi-file-earmark-pdf-fill' | 'bi bi-file-earmark-pdf' | 'bi bi-file-pdf-fill' | 'bi bi-file-pdf' | 'bi bi-gender-ambiguous' | 'bi bi-gender-female' | 'bi bi-gender-male' | 'bi bi-gender-trans' | 'bi bi-headset-vr' | 'bi bi-info-lg' | 'bi bi-mastodon' | 'bi bi-messenger' | 'bi bi-piggy-bank-fill' | 'bi bi-piggy-bank' | 'bi bi-pin-map-fill' | 'bi bi-pin-map' | 'bi bi-plus-lg' | 'bi bi-question-lg' | 'bi bi-recycle' | 'bi bi-reddit' | 'bi bi-safe-fill' | 'bi bi-safe2-fill' | 'bi bi-safe2' | 'bi bi-sd-card-fill' | 'bi bi-sd-card' | 'bi bi-skype' | 'bi bi-slash-lg' | 'bi bi-translate' | 'bi bi-x-lg' | 'bi bi-safe' | 'bi bi-apple' | 'bi bi-microsoft' | 'bi bi-windows' | 'bi bi-behance' | 'bi bi-dribbble' | 'bi bi-line' | 'bi bi-medium' | 'bi bi-paypal' | 'bi bi-pinterest' | 'bi bi-signal' | 'bi bi-snapchat' | 'bi bi-spotify' | 'bi bi-stack-overflow' | 'bi bi-strava' | 'bi bi-wordpress' | 'bi bi-vimeo' | 'bi bi-activity' | 'bi bi-easel2-fill' | 'bi bi-easel2' | 'bi bi-easel3-fill' | 'bi bi-easel3' | 'bi bi-fan' | 'bi bi-fingerprint' | 'bi bi-graph-down-arrow' | 'bi bi-graph-up-arrow' | 'bi bi-hypnotize' | 'bi bi-magic' | 'bi bi-person-rolodex' | 'bi bi-person-video' | 'bi bi-person-video2' | 'bi bi-person-video3' | 'bi bi-person-workspace' | 'bi bi-radioactive' | 'bi bi-webcam-fill' | 'bi bi-webcam' | 'bi bi-yin-yang' | 'bi bi-bandaid-fill' | 'bi bi-bandaid' | 'bi bi-bluetooth' | 'bi bi-body-text' | 'bi bi-boombox' | 'bi bi-boxes' | 'bi bi-dpad-fill' | 'bi bi-dpad' | 'bi bi-ear-fill' | 'bi bi-ear' | 'bi bi-envelope-check-fill' | 'bi bi-envelope-check' | 'bi bi-envelope-dash-fill' | 'bi bi-envelope-dash' | 'bi bi-envelope-exclamation-fill' | 'bi bi-envelope-exclamation' | 'bi bi-envelope-plus-fill' | 'bi bi-envelope-plus' | 'bi bi-envelope-slash-fill' | 'bi bi-envelope-slash' | 'bi bi-envelope-x-fill' | 'bi bi-envelope-x' | 'bi bi-explicit-fill' | 'bi bi-explicit' | 'bi bi-git' | 'bi bi-infinity' | 'bi bi-list-columns-reverse' | 'bi bi-list-columns' | 'bi bi-meta' | 'bi bi-nintendo-switch' | 'bi bi-pc-display-horizontal' | 'bi bi-pc-display' | 'bi bi-pc-horizontal' | 'bi bi-pc' | 'bi bi-playstation' | 'bi bi-plus-slash-minus' | 'bi bi-projector-fill' | 'bi bi-projector' | 'bi bi-qr-code-scan' | 'bi bi-qr-code' | 'bi bi-quora' | 'bi bi-quote' | 'bi bi-robot' | 'bi bi-send-check-fill' | 'bi bi-send-check' | 'bi bi-send-dash-fill' | 'bi bi-send-dash' | 'bi bi-send-exclamation-fill' | 'bi bi-send-exclamation' | 'bi bi-send-fill' | 'bi bi-send-plus-fill' | 'bi bi-send-plus' | 'bi bi-send-slash-fill' | 'bi bi-send-slash' | 'bi bi-send-x-fill' | 'bi bi-send-x' | 'bi bi-send' | 'bi bi-steam' | 'bi bi-terminal-dash' | 'bi bi-terminal-plus' | 'bi bi-terminal-split' | 'bi bi-ticket-detailed-fill' | 'bi bi-ticket-detailed' | 'bi bi-ticket-fill' | 'bi bi-ticket-perforated-fill' | 'bi bi-ticket-perforated' | 'bi bi-ticket' | 'bi bi-tiktok' | 'bi bi-window-dash' | 'bi bi-window-desktop' | 'bi bi-window-fullscreen' | 'bi bi-window-plus' | 'bi bi-window-split' | 'bi bi-window-stack' | 'bi bi-window-x' | 'bi bi-xbox' | 'bi bi-ethernet' | 'bi bi-hdmi-fill' | 'bi bi-hdmi' | 'bi bi-usb-c-fill' | 'bi bi-usb-c' | 'bi bi-usb-fill' | 'bi bi-usb-plug-fill' | 'bi bi-usb-plug' | 'bi bi-usb-symbol' | 'bi bi-usb' | 'bi bi-boombox-fill' | 'bi bi-displayport' | 'bi bi-gpu-card' | 'bi bi-memory' | 'bi bi-modem-fill' | 'bi bi-modem' | 'bi bi-motherboard-fill' | 'bi bi-motherboard' | 'bi bi-optical-audio-fill' | 'bi bi-optical-audio' | 'bi bi-pci-card' | 'bi bi-router-fill' | 'bi bi-router' | 'bi bi-thunderbolt-fill' | 'bi bi-thunderbolt' | 'bi bi-usb-drive-fill' | 'bi bi-usb-drive' | 'bi bi-usb-micro-fill' | 'bi bi-usb-micro' | 'bi bi-usb-mini-fill' | 'bi bi-usb-mini' | 'bi bi-cloud-haze2' | 'bi bi-device-hdd-fill' | 'bi bi-device-hdd' | 'bi bi-device-ssd-fill' | 'bi bi-device-ssd' | 'bi bi-displayport-fill' | 'bi bi-mortarboard-fill' | 'bi bi-mortarboard' | 'bi bi-terminal-x' | 'bi bi-arrow-through-heart-fill' | 'bi bi-arrow-through-heart' | 'bi bi-badge-sd-fill' | 'bi bi-badge-sd' | 'bi bi-bag-heart-fill' | 'bi bi-bag-heart' | 'bi bi-balloon-fill' | 'bi bi-balloon-heart-fill' | 'bi bi-balloon-heart' | 'bi bi-balloon' | 'bi bi-box2-fill' | 'bi bi-box2-heart-fill' | 'bi bi-box2-heart' | 'bi bi-box2' | 'bi bi-braces-asterisk' | 'bi bi-calendar-heart-fill' | 'bi bi-calendar-heart' | 'bi bi-calendar2-heart-fill' | 'bi bi-calendar2-heart' | 'bi bi-chat-heart-fill' | 'bi bi-chat-heart' | 'bi bi-chat-left-heart-fill' | 'bi bi-chat-left-heart' | 'bi bi-chat-right-heart-fill' | 'bi bi-chat-right-heart' | 'bi bi-chat-square-heart-fill' | 'bi bi-chat-square-heart' | 'bi bi-clipboard-check-fill' | 'bi bi-clipboard-data-fill' | 'bi bi-clipboard-fill' | 'bi bi-clipboard-heart-fill' | 'bi bi-clipboard-heart' | 'bi bi-clipboard-minus-fill' | 'bi bi-clipboard-plus-fill' | 'bi bi-clipboard-pulse' | 'bi bi-clipboard-x-fill' | 'bi bi-clipboard2-check-fill' | 'bi bi-clipboard2-check' | 'bi bi-clipboard2-data-fill' | 'bi bi-clipboard2-data' | 'bi bi-clipboard2-fill' | 'bi bi-clipboard2-heart-fill' | 'bi bi-clipboard2-heart' | 'bi bi-clipboard2-minus-fill' | 'bi bi-clipboard2-minus' | 'bi bi-clipboard2-plus-fill' | 'bi bi-clipboard2-plus' | 'bi bi-clipboard2-pulse-fill' | 'bi bi-clipboard2-pulse' | 'bi bi-clipboard2-x-fill' | 'bi bi-clipboard2-x' | 'bi bi-clipboard2' | 'bi bi-emoji-kiss-fill' | 'bi bi-emoji-kiss' | 'bi bi-envelope-heart-fill' | 'bi bi-envelope-heart' | 'bi bi-envelope-open-heart-fill' | 'bi bi-envelope-open-heart' | 'bi bi-envelope-paper-fill' | 'bi bi-envelope-paper-heart-fill' | 'bi bi-envelope-paper-heart' | 'bi bi-envelope-paper' | 'bi bi-filetype-aac' | 'bi bi-filetype-ai' | 'bi bi-filetype-bmp' | 'bi bi-filetype-cs' | 'bi bi-filetype-css' | 'bi bi-filetype-csv' | 'bi bi-filetype-doc' | 'bi bi-filetype-docx' | 'bi bi-filetype-exe' | 'bi bi-filetype-gif' | 'bi bi-filetype-heic' | 'bi bi-filetype-html' | 'bi bi-filetype-java' | 'bi bi-filetype-jpg' | 'bi bi-filetype-js' | 'bi bi-filetype-jsx' | 'bi bi-filetype-key' | 'bi bi-filetype-m4p' | 'bi bi-filetype-md' | 'bi bi-filetype-mdx' | 'bi bi-filetype-mov' | 'bi bi-filetype-mp3' | 'bi bi-filetype-mp4' | 'bi bi-filetype-otf' | 'bi bi-filetype-pdf' | 'bi bi-filetype-php' | 'bi bi-filetype-png' | 'bi bi-filetype-ppt' | 'bi bi-filetype-psd' | 'bi bi-filetype-py' | 'bi bi-filetype-raw' | 'bi bi-filetype-rb' | 'bi bi-filetype-sass' | 'bi bi-filetype-scss' | 'bi bi-filetype-sh' | 'bi bi-filetype-svg' | 'bi bi-filetype-tiff' | 'bi bi-filetype-tsx' | 'bi bi-filetype-ttf' | 'bi bi-filetype-txt' | 'bi bi-filetype-wav' | 'bi bi-filetype-woff' | 'bi bi-filetype-xls' | 'bi bi-filetype-xml' | 'bi bi-filetype-yml' | 'bi bi-heart-arrow' | 'bi bi-heart-pulse-fill' | 'bi bi-heart-pulse' | 'bi bi-heartbreak-fill' | 'bi bi-heartbreak' | 'bi bi-hearts' | 'bi bi-hospital-fill' | 'bi bi-hospital' | 'bi bi-house-heart-fill' | 'bi bi-house-heart' | 'bi bi-incognito' | 'bi bi-magnet-fill' | 'bi bi-magnet' | 'bi bi-person-heart' | 'bi bi-person-hearts' | 'bi bi-phone-flip' | 'bi bi-plugin' | 'bi bi-postage-fill' | 'bi bi-postage-heart-fill' | 'bi bi-postage-heart' | 'bi bi-postage' | 'bi bi-postcard-fill' | 'bi bi-postcard-heart-fill' | 'bi bi-postcard-heart' | 'bi bi-postcard' | 'bi bi-search-heart-fill' | 'bi bi-search-heart' | 'bi bi-sliders2-vertical' | 'bi bi-sliders2' | 'bi bi-trash3-fill' | 'bi bi-trash3' | 'bi bi-valentine' | 'bi bi-valentine2' | 'bi bi-wrench-adjustable-circle-fill' | 'bi bi-wrench-adjustable-circle' | 'bi bi-wrench-adjustable' | 'bi bi-filetype-json' | 'bi bi-filetype-pptx' | 'bi bi-filetype-xlsx' | 'bi bi-1-circle-fill' | 'bi bi-1-circle' | 'bi bi-1-square-fill' | 'bi bi-1-square' | 'bi bi-2-circle-fill' | 'bi bi-2-circle' | 'bi bi-2-square-fill' | 'bi bi-2-square' | 'bi bi-3-circle-fill' | 'bi bi-3-circle' | 'bi bi-3-square-fill' | 'bi bi-3-square' | 'bi bi-4-circle-fill' | 'bi bi-4-circle' | 'bi bi-4-square-fill' | 'bi bi-4-square' | 'bi bi-5-circle-fill' | 'bi bi-5-circle' | 'bi bi-5-square-fill' | 'bi bi-5-square' | 'bi bi-6-circle-fill' | 'bi bi-6-circle' | 'bi bi-6-square-fill' | 'bi bi-6-square' | 'bi bi-7-circle-fill' | 'bi bi-7-circle' | 'bi bi-7-square-fill' | 'bi bi-7-square' | 'bi bi-8-circle-fill' | 'bi bi-8-circle' | 'bi bi-8-square-fill' | 'bi bi-8-square' | 'bi bi-9-circle-fill' | 'bi bi-9-circle' | 'bi bi-9-square-fill' | 'bi bi-9-square' | 'bi bi-airplane-engines-fill' | 'bi bi-airplane-engines' | 'bi bi-airplane-fill' | 'bi bi-airplane' | 'bi bi-alexa' | 'bi bi-alipay' | 'bi bi-android' | 'bi bi-android2' | 'bi bi-box-fill' | 'bi bi-box-seam-fill' | 'bi bi-browser-chrome' | 'bi bi-browser-edge' | 'bi bi-browser-firefox' | 'bi bi-browser-safari' | 'bi bi-c-circle-fill' | 'bi bi-c-circle' | 'bi bi-c-square-fill' | 'bi bi-c-square' | 'bi bi-capsule-pill' | 'bi bi-capsule' | 'bi bi-car-front-fill' | 'bi bi-car-front' | 'bi bi-cassette-fill' | 'bi bi-cassette' | 'bi bi-cc-circle-fill' | 'bi bi-cc-circle' | 'bi bi-cc-square-fill' | 'bi bi-cc-square' | 'bi bi-cup-hot-fill' | 'bi bi-cup-hot' | 'bi bi-currency-rupee' | 'bi bi-dropbox' | 'bi bi-escape' | 'bi bi-fast-forward-btn-fill' | 'bi bi-fast-forward-btn' | 'bi bi-fast-forward-circle-fill' | 'bi bi-fast-forward-circle' | 'bi bi-fast-forward-fill' | 'bi bi-fast-forward' | 'bi bi-filetype-sql' | 'bi bi-fire' | 'bi bi-google-play' | 'bi bi-h-circle-fill' | 'bi bi-h-circle' | 'bi bi-h-square-fill' | 'bi bi-h-square' | 'bi bi-indent' | 'bi bi-lungs-fill' | 'bi bi-lungs' | 'bi bi-microsoft-teams' | 'bi bi-p-circle-fill' | 'bi bi-p-circle' | 'bi bi-p-square-fill' | 'bi bi-p-square' | 'bi bi-pass-fill' | 'bi bi-pass' | 'bi bi-prescription' | 'bi bi-prescription2' | 'bi bi-r-circle-fill' | 'bi bi-r-circle' | 'bi bi-r-square-fill' | 'bi bi-r-square' | 'bi bi-repeat-1' | 'bi bi-repeat' | 'bi bi-rewind-btn-fill' | 'bi bi-rewind-btn' | 'bi bi-rewind-circle-fill' | 'bi bi-rewind-circle' | 'bi bi-rewind-fill' | 'bi bi-rewind' | 'bi bi-train-freight-front-fill' | 'bi bi-train-freight-front' | 'bi bi-train-front-fill' | 'bi bi-train-front' | 'bi bi-train-lightrail-front-fill' | 'bi bi-train-lightrail-front' | 'bi bi-truck-front-fill' | 'bi bi-truck-front' | 'bi bi-ubuntu' | 'bi bi-unindent' | 'bi bi-unity' | 'bi bi-universal-access-circle' | 'bi bi-universal-access' | 'bi bi-virus' | 'bi bi-virus2' | 'bi bi-wechat' | 'bi bi-yelp' | 'bi bi-sign-stop-fill' | 'bi bi-sign-stop-lights-fill' | 'bi bi-sign-stop-lights' | 'bi bi-sign-stop' | 'bi bi-sign-turn-left-fill' | 'bi bi-sign-turn-left' | 'bi bi-sign-turn-right-fill' | 'bi bi-sign-turn-right' | 'bi bi-sign-turn-slight-left-fill' | 'bi bi-sign-turn-slight-left' | 'bi bi-sign-turn-slight-right-fill' | 'bi bi-sign-turn-slight-right' | 'bi bi-sign-yield-fill' | 'bi bi-sign-yield' | 'bi bi-ev-station-fill' | 'bi bi-ev-station' | 'bi bi-fuel-pump-diesel-fill' | 'bi bi-fuel-pump-diesel' | 'bi bi-fuel-pump-fill' | 'bi bi-fuel-pump' | 'bi bi-0-circle-fill' | 'bi bi-0-circle' | 'bi bi-0-square-fill' | 'bi bi-0-square' | 'bi bi-rocket-fill' | 'bi bi-rocket-takeoff-fill' | 'bi bi-rocket-takeoff' | 'bi bi-rocket' | 'bi bi-stripe' | 'bi bi-subscript' | 'bi bi-superscript' | 'bi bi-trello' | 'bi bi-envelope-at-fill' | 'bi bi-envelope-at' | 'bi bi-regex' | 'bi bi-text-wrap' | 'bi bi-sign-dead-end-fill' | 'bi bi-sign-dead-end' | 'bi bi-sign-do-not-enter-fill' | 'bi bi-sign-do-not-enter' | 'bi bi-sign-intersection-fill' | 'bi bi-sign-intersection-side-fill' | 'bi bi-sign-intersection-side' | 'bi bi-sign-intersection-t-fill' | 'bi bi-sign-intersection-t' | 'bi bi-sign-intersection-y-fill' | 'bi bi-sign-intersection-y' | 'bi bi-sign-intersection' | 'bi bi-sign-merge-left-fill' | 'bi bi-sign-merge-left' | 'bi bi-sign-merge-right-fill' | 'bi bi-sign-merge-right' | 'bi bi-sign-no-left-turn-fill' | 'bi bi-sign-no-left-turn' | 'bi bi-sign-no-parking-fill' | 'bi bi-sign-no-parking' | 'bi bi-sign-no-right-turn-fill' | 'bi bi-sign-no-right-turn' | 'bi bi-sign-railroad-fill' | 'bi bi-sign-railroad' | 'bi bi-building-add' | 'bi bi-building-check' | 'bi bi-building-dash' | 'bi bi-building-down' | 'bi bi-building-exclamation' | 'bi bi-building-fill-add' | 'bi bi-building-fill-check' | 'bi bi-building-fill-dash' | 'bi bi-building-fill-down' | 'bi bi-building-fill-exclamation' | 'bi bi-building-fill-gear' | 'bi bi-building-fill-lock' | 'bi bi-building-fill-slash' | 'bi bi-building-fill-up' | 'bi bi-building-fill-x' | 'bi bi-building-fill' | 'bi bi-building-gear' | 'bi bi-building-lock' | 'bi bi-building-slash' | 'bi bi-building-up' | 'bi bi-building-x' | 'bi bi-buildings-fill' | 'bi bi-buildings' | 'bi bi-bus-front-fill' | 'bi bi-bus-front' | 'bi bi-ev-front-fill' | 'bi bi-ev-front' | 'bi bi-globe-americas' | 'bi bi-globe-asia-australia' | 'bi bi-globe-central-south-asia' | 'bi bi-globe-europe-africa' | 'bi bi-house-add-fill' | 'bi bi-house-add' | 'bi bi-house-check-fill' | 'bi bi-house-check' | 'bi bi-house-dash-fill' | 'bi bi-house-dash' | 'bi bi-house-down-fill' | 'bi bi-house-down' | 'bi bi-house-exclamation-fill' | 'bi bi-house-exclamation' | 'bi bi-house-gear-fill' | 'bi bi-house-gear' | 'bi bi-house-lock-fill' | 'bi bi-house-lock' | 'bi bi-house-slash-fill' | 'bi bi-house-slash' | 'bi bi-house-up-fill' | 'bi bi-house-up' | 'bi bi-house-x-fill' | 'bi bi-house-x' | 'bi bi-person-add' | 'bi bi-person-down' | 'bi bi-person-exclamation' | 'bi bi-person-fill-add' | 'bi bi-person-fill-check' | 'bi bi-person-fill-dash' | 'bi bi-person-fill-down' | 'bi bi-person-fill-exclamation' | 'bi bi-person-fill-gear' | 'bi bi-person-fill-lock' | 'bi bi-person-fill-slash' | 'bi bi-person-fill-up' | 'bi bi-person-fill-x' | 'bi bi-person-gear' | 'bi bi-person-lock' | 'bi bi-person-slash' | 'bi bi-person-up' | 'bi bi-scooter' | 'bi bi-taxi-front-fill' | 'bi bi-taxi-front' | 'bi bi-amd' | 'bi bi-database-add' | 'bi bi-database-check' | 'bi bi-database-dash' | 'bi bi-database-down' | 'bi bi-database-exclamation' | 'bi bi-database-fill-add' | 'bi bi-database-fill-check' | 'bi bi-database-fill-dash' | 'bi bi-database-fill-down' | 'bi bi-database-fill-exclamation' | 'bi bi-database-fill-gear' | 'bi bi-database-fill-lock' | 'bi bi-database-fill-slash' | 'bi bi-database-fill-up' | 'bi bi-database-fill-x' | 'bi bi-database-fill' | 'bi bi-database-gear' | 'bi bi-database-lock' | 'bi bi-database-slash' | 'bi bi-database-up' | 'bi bi-database-x' | 'bi bi-database' | 'bi bi-houses-fill' | 'bi bi-houses' | 'bi bi-nvidia' | 'bi bi-person-vcard-fill' | 'bi bi-person-vcard' | 'bi bi-sina-weibo' | 'bi bi-tencent-qq' | 'bi bi-wikipedia'
}
