var model = {
    name: "Igorek",
    room: [{name: "Комната", width: 310, height: 420, coordX: 0, coordY: 0}],
    furniture: [{name: "Диван", width: 210, height: 150, coordX: 0, coordY: 0, color: "red"},
        {name: "Кресло", width: 60, height: 50, coordX: 0, coordY: 0, color: "green"},
        {name: "Стол", width: 220, height: 110, coordX: 0, coordY: 0, color: "black"}]
};

var courseListApp = angular.module("MyRoomApp", []);
courseListApp.controller("MyRoomCtrl", function ($scope) {
    $scope.data = model;

    $scope.getPageX = function () {
        return MouseCoords.getX(event);
    };

    $scope.getPageY = function () {
        return MouseCoords.getY(event)
    };

    $scope.mouse = {
        coordX: "",
        coordY: "",
        divX: "",
        divY: "",
        selectedFurnitureIndex: ""
    };

    $scope.addNewFurniture = function () {
        var pattern = /[0-9]+/i;
        if ($scope.itemName == null || $scope.itemName === "") {
            alert("Не задано название мебели");
            $scope.deleteItem(this.furniture.index);
        }
        if ($scope.itemColor == null || $scope.itemColor === "") {
            $scope.itemColor = "black";
        }
        if ($scope.itemWidth > $scope.data.room[0].width) {
            $scope.itemWidth = $scope.data.room[0].width;
        }
        if ($scope.itemHeight > $scope.data.room[0].height) {
            $scope.itemHeight = $scope.data.room[0].height;
        }
        if (!pattern.test($scope.itemHeight) || $scope.itemHeight <= 0) {
            alert("Некорректно задана длина мебели");
            $scope.deleteItem(this.furniture.index);
        }
        if (!pattern.test($scope.itemWidth) || $scope.itemWidth <= 0) {
            alert("Некорректно задана ширина мебели");
            $scope.deleteItem(this.furniture.index);
        }
        $scope.data.furniture.push({
            name: $scope.itemName,
            width: $scope.itemWidth,
            height: $scope.itemHeight,
            color: $scope.itemColor,
            coordX: $scope.coordX,
            coordY: $scope.coordY
        });
        $scope.itemName = "";
        $scope.itemWidth = "";
        $scope.itemHeight = "";
        $scope.itemColor = "";
        $scope.coordX = "";
        $scope.coordY = "";
    };

    $scope.changeItem = function (item) {
        var a = item.width;
        item.width = item.height;
        item.height = a;

        if (item.width > $scope.data.room[0].width) {
            item.width = $scope.data.room[0].width;
        }
        if (item.height > $scope.data.room[0].height) {
            item.height = $scope.data.room[0].height;
        }
    };

    $scope.deleteItem = function (index) {
        $scope.data.furniture.splice(index, 1);
    };

    $scope.holdObject = function (item) {
        $scope.mouse.coordX = MouseCoords.getX(event);
        $scope.mouse.coordY = MouseCoords.getY(event);
        $scope.mouse.divX = $scope.mouse.coordX - item.coordX;
        $scope.mouse.divY = $scope.mouse.coordY - item.coordY;
        $scope.mouse.selectedFurnitureIndex = this.$index;
    };

    $scope.fieldStyle = function () {
        return "width:" + $scope.data.room[0].width + "px; height:" +
            $scope.data.room[0].height + "px;";
    };

    $scope.itemStyle = function (item) {
        return "background-color:" + item.color + "; width:" +
            item.width + "px; height:" + item.height + "px; top:" +
            item.coordY + "px; left:" + item.coordX + "px;";
    };

    $scope.move = function () {
        var holdItem = $scope.data.furniture[$scope.mouse.selectedFurnitureIndex];
        if (holdItem != null) {

            var mouseCoordX = MouseCoords.getX(event);
            var mouseCoordY = MouseCoords.getY(event);

            var holdItemX = mouseCoordX - $scope.mouse.divX;
            var holdItemY = mouseCoordY - $scope.mouse.divY;

            var roomWidth = $scope.data.room[0].width;
            var roomHeight = $scope.data.room[0].height;

            if (holdItemX < 0) {
                holdItem.coordX = 0;
            } else {
                if (holdItemX + Number(holdItem.width) > roomWidth) {
                    holdItem.coordX = roomWidth - Number(holdItem.width);
                } else {
                    holdItem.coordX = holdItemX;
                }
            }

            if (holdItemY < 0) {
                holdItem.coordY = 0;
            } else {
                if (holdItemY + Number(holdItem.height) > roomHeight) {
                    holdItem.coordY = roomHeight - Number(holdItem.height);
                } else {
                    holdItem.coordY = holdItemY;
                }
            }
        }
    };

    $scope.free = function () {
        $scope.mouse.selectedFurnitureIndex = "";
        $scope.mouse.coordX = "";
        $scope.mouse.coordY = "";
        $scope.mouse.divX = "";
        $scope.mouse.divY = "";
    };
});