/**
 * Объект работает с координатами курсора
 */

var MouseCoords = {
    getX: function (e) {
        if (e.pageX) {
            return e.pageX;
        } else if (e.clientX) {
            return e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) -
                document.documentElement.clientLeft;
        }
        return 0;
    },

    getY: function (e) {
        if (e.pageY) {
            return e.pageY;
        } else if (e.clientY) {
            return e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) -
                document.documentElement.clientTop;
        }
        return 0;
    }
};