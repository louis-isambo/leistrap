import { maxArray } from "./rand.js"



const DAYS = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    0: "Sunday",
}

const MONTHS = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December"
}
/**
 * return a range list of the number
 * @param {number} num
 *  
 */
function inRange(b = 0, num) {
    const x = []
    for (let i = b; i < num; i++) { x.push(i) }
    return x
}

/*
 *the number of the day per week, except February 
 */
const Mdays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

class Calendar extends Date {

    /**
     * Return True for leap years, False for non-leap years.
     * @param {number} year
     * @returns {Boolean} 
     */
    isLeap(year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
    }

    /**
        * Return number of leap years in range [y1, y2).
          Assume y1 <= y2.
        @param {number} y1
        @param {number} y2  
    */
    leapDays(y1, y2) {

        const _y1 = y1 - 1
        const _y2 = y2 - 1

        return (
            Math.floor(_y2 / 4) - Math.floor(_y1 / 4))
            - (Math.floor(_y2 / 100) - Math.floor(_y1 / 100))
            + (Math.floor(_y2 / 400) - Math.floor(_y1 / 400))
    }

    /**
     * return the Day of the `firstDay` of the month given 
     * @param {number} month  
     * @returns number
     */
    firstWeekDay(month) {
        const g = month ? month - 1 : this.getMonth()
        if (g != -1) {
            const Y = this.getFullYear()
            const M = g
            const D = this.setFullYear(Y, M, 1)
            return new Date(D).getDay()
        }
    }

    /**
     * return the Day of the `lastDay` of the month given 
     * @param {number} month  
     * @returns number
     */

    lastWeekDay(month) {
        const g = month ? month : this.getMonth() + 1
        if (g != -1) {
            const Y = this.getFullYear()
            const j = this.monthDays(Y, g)
            return new Date(`${Y}-${`${g}`.length >= 2 ? g : `0${g}`}-${j}`).getDay()
        }
    }

    /**
     * return the number of the February month of the year given
     * @param {number} year 
     * @returns number
     */
    fDays(year = this.getFullYear()) {
        return this.isLeap(year) ? 29 : 28
    }

    /**
     * return the number of the days of the month given (except February : 2)
     * @param {number} month
     * @param {number} year  
     */
    monthDays(year, month) {
        const g = month ? month - 1 : this.getMonth() != 1 ? this.getMonth() : 1
        const y = year ? year : this.getFullYear()
        if (g != 1) {
            const M = this.setFullYear(y, g, 31)
            const D = new Date(M)
            this.LM = g
            return D.getMonth() == g ? 31 : 30

        } else { this.LM = this.getMonth(); return this.fDays(y) }
    }

    getFullCalendar(M) {
        if (!M) { M = this.getMonth() + 1 }
        let next, prev;
        if (M == 1) {
            next = this.getCalendar(M + 1)
            prev = new Calendar(`${this.getFullYear() - 1}`).getCalendar(12)

        }
        if (M == 12) {
            next = new Calendar(`${this.getFullYear() + 1}`).getCalendar(1)
            prev = this.getCalendar(11)
        }
        if (M != 1 && M != 12) {
            next = this.getCalendar(M + 1)
            prev = this.getCalendar(M - 1)
        }
        const current = this.getCalendar(M)
        const days = Object.keys(current)
        days.forEach(d => {
            if (current[d][0] == 0) { current[d][0] = `prev_${prev[d][prev[d].length - 1]}` }
            if (current[d][current[d].length - 1] == 0) { current[d][current[d].length - 1] = `next_${next[d][0]}` }
        })
        return current
    }
    /**
     * return an object that contains the list number of a day per month 
     * @param {number} M month 
     * @returns {object}
     */
    getCalendar(M = undefined) {
        let slice = 0
        const DX = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 0: [] }
        // chack the first day

        const f = this.firstWeekDay(M)
        const k = [1, 2, 3, 4, 5, 6, 0]
        for (let x = 0; x < k.length; x++) {
            if (k[x] == f) { break }
            else { DX[k[x]].push(0) }
        }

        //complete the first days

        for (let x = 0; x < k.length; x++) {

            if (DX[k[x]].length != 1) {
                slice += 1
                DX[k[x]].push(slice)
            }
        }
        // get the rest days
        let c = 0
        const DN = inRange(slice + 1, this.monthDays() + 1)

        for (let x = 0; x < DN.length; x++) {
            c += 1
            if (c == 7) { c = 0 }
            DX[c].push(DN[x])
        }

        // Complete the len

        for (let x = 0; x < 7; x++) {
            let lenC = DX[x].length
            if (6 - lenC > 0) {
                for (let f = 0; f < 5 - lenC; f++) { DX[x].push(0) }
            }
        }
        const ve = Object.keys(DX)
        const mx = []
        ve.forEach(item => mx.push(DX[item].length))
        const max = maxArray(mx)
        ve.forEach(item => { if (DX[item].length < max) { DX[item].push(0) } })
        return DX
    }
    Ldays() { return DAYS }
    Lmonths() { return MONTHS }
}

export { Calendar }

