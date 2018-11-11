window.onload = function () {

    var count = 0;
    var countpopup = 0;
    var addARow = document.querySelector('#addRow');
    var addDescription = [];
    addARow.onclick = function () {
        AddRow();
    };
    function AddRow() {
        count++;
        var main = document.querySelector('main');
        var tasks = document.createElement('button');
        var croix = document.createElement('div');
        var row = document.createElement('div');
        var titleTask = document.createElement('span');
        row.className += 'row';
        titleTask.innerHTML = "Task n° " + count;
        croix.innerHTML = "&times";
        croix.className += 'croix';
        tasks.innerHTML = "Add Task";
        tasks.className += 'task';
        row.appendChild(titleTask);
        row.appendChild(croix);
        main.appendChild(row);

        var titledescription = document.createElement('input');
        var title = document.createElement('div');

        row.appendChild(title);
        row.appendChild(tasks);

        var message = document.createElement('textarea');
        var textMessage = document.createElement('text');
        var textTask = document.createElement('text');
        var task = document.createElement('input');
        var cancel = document.createElement('button');
        var create = document.createElement('button');
        var flex = document.createElement('div');

        tasks.onclick = function addTask() {

            task.style.margin = "20px";
            task.className = 'titledescription';
            textTask.className += 'textTask';
            titledescription.className += 'task';

            flex.className += 'flex';
            message.className = 'message';
            cancel.className = 'cancel';
            create.className = 'create';
            cancel.innerHTML = "CANCEL";
            create.innerHTML = "CREATE";

            row.appendChild(title);
            row.appendChild(textTask);
            row.appendChild(task);
            row.appendChild(textMessage);
            row.appendChild(message);
            row.appendChild(flex);
            row.appendChild(create);
            row.appendChild(cancel);

        };
        cancel.onclick = function canceltask() {
            //row.removeChild(task);
            row.removeChild(textTask);
            row.removeChild(textMessage);
            row.removeChild(message);
            row.removeChild(flex);
            flex.appendChild(cancel);
            flex.appendChild(create);
        };
        croix.onclick = function () {
            main.removeChild(row);
        };

        create.onclick = function createtask() {

            var createMessage = document.querySelector('.message').value;
            var taskdiv = document.createElement('div');
            var button = document.createElement('div');
            taskdiv.innerText = task.value + "\n" +"\n"+ createMessage;
            taskdiv.className += 'taskdiv';
            taskdiv.setAttribute('draggable', 'true');
            button.innerHTML = "&times";
            button.className += "buttton";

            var closeBtn = document.querySelector('.closeBtn');
            var modal = document.getElementById('simpleModal');
            var popupbutton = document.querySelector('.popupbutton');

            taskdiv.ondblclick = function () {
                countpopup++;
                modal.style.display = 'block';
                document.querySelector('.onrow').innerText = titleTask.innerHTML;
            };
            popupbutton.onclick = function () {
                var changeTitle = document.getElementById('changetitle').value;
                var changeTask = document.getElementById('changetask').value;
                taskdiv.innerText = changeTitle+ "\n" + "\n"+ changeTask;
                taskdiv.appendChild(button);

                modal.style.display = "none";
            }

            closeBtn.onclick = function () {
                modal.style.display = "none";

            };

            if (createMessage == "" || createMessage == " ") {
                return;
            }

            row.appendChild(taskdiv);
            taskdiv.appendChild(button);
            flex.appendChild(cancel);
            row.removeChild(task);
            row.removeChild(textTask);
            row.removeChild(textMessage);
            row.removeChild(message);
            row.removeChild(flex);
            flex.appendChild(cancel);
            flex.appendChild(create);

            taskdiv.ondragstart = function (event) {
                drag(event);
            }
            row.ondrop = function (event) {
                drop(event);
            }
            row.ondragover = function (event) {
                allowDrop(event)
            }
            button.onclick = function () {
                row.removeChild(taskdiv);
            };
        }
        titleTask.onclick = function renameTitle() {
            var Newtextitle = document.createElement('input');

            Newtextitle.className += 'Newtextitle';
            row.replaceChild(Newtextitle, titleTask);

            Newtextitle.onchange = function () {
                var titleTask = document.createElement('div');
                titleTask.className += 'titleTask';
                titleTask.innerText = Newtextitle.value;
                row.replaceChild(titleTask, Newtextitle);

                titleTask.onclick = function (ev) {
                    Newtextitle.innerText = titleTask.value;
                    row.replaceChild(Newtextitle, titleTask);
                };
            };
        }
    };
};
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData(".taskdiv");
}

function drop(ev) {
    ev.preventDefault();
    ev.target.appendChild(document.querySelector('.taskdiv'));
}