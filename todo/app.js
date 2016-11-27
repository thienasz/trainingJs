var todo = (function () {
    var data = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];
    var count = localStorage.getItem("todoDataCount") || 0;
    var inputId = 'input-note';
    var btnInputId = 'btn-input-note';
    var showId = 'show-note';

    var add = function (title, content) {
        var obj = {};
        obj.title = title;
        obj.content = content;
        obj.status = true;
        obj.count = count;
        data.push(obj);
        count++;
        return data.length - 1;
    };
     var remove = function (index) {
         console.log(index);
         console.log(222);
         if (index > -1 && index < data.length) {
             data.splice(index, 1);
         }
    };

    var save = function () {
        localStorage.setItem("todoData", JSON.stringify(data));
        localStorage.setItem("todoDataCount", count);
    };

    var updateStatus = function (value, index) {
        if(typeof data[index] === 'undefined') {
            return false;
        }
        data[index].status = value;

        return true;
    };

    var renderHtml = function (index) {
        var value = data[index];
        var checked = value.status ? 'checked' : '';
        var showContent = document.getElementById(showId);
        var html = '';
        html += '<article id="note-element-' + value.count + '" class="note note-element bg-shadow">' +
            '<header class="note-title">' +
            '<h4>' + value.title +
            '<span class="pull-right">' +
            '<input value="' + index + '" id="status-' + value.count + '" class="toggle-switch" type="checkbox" ' + checked + '>' +
            '<label for="status-' + value.count + '"></label>' +
            '</span>' +
            '</h4>' +
            '</header>' +
            '<section class="note-content">' + value.content +
            '</section>' +
            '<footer class="note-footer pull-right">' +
            '<button class="btn btn-delete btn-square btn-remove" id="btn-remove-' + value.count + '" data-index="' + value.count + '" value="' + index + '">Delete</button>' +
            '</footer>' +
            '</article>';

        var wrapper= document.createElement('div');
        wrapper.innerHTML= html;
        showContent.insertBefore(wrapper.firstChild, showContent.firstChild);
        addEvent(index);
    };

    var addEvent = function (index) {

        document.getElementById('btn-remove-' + data[index].count).addEventListener('click', function (e) {
            remove(e.target.value);
            refresh();
            save();
        });

        document.getElementById('status-' + data[index].count).addEventListener('change', function (e) {
            console.log(123);
            var valueChecked = e.target.checked;
            var indexUd = e.target.value;
            updateStatus(valueChecked, indexUd);
            save();
        })
    };

    var refresh = function () {
        var showContent = document.getElementById(showId);
        showContent.innerHTML = "";
        data.forEach(function (value, index) {
            renderHtml(index);
        });
    };

    var init = function () {
        var index;
        var btn = document.getElementById(btnInputId);
        var title = document.getElementById(inputId).querySelector('input[name="title"]');
        var content = document.getElementById(inputId).querySelector('input[name="content"]');
        refresh();
        btn.addEventListener('click', function () {
            if(title.value == "" || content.value == "") {
                return false;
            }
            index = add(title.value, content.value);
            title.value = '';
            content.value = '';
            renderHtml(index);
            save();
        });
    };

    return {
        init: init
    }
})();

todo.init();
