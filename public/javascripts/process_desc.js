var converter = new showdown.Converter();

function processDescription(id, path) {
    $.get('/' + path)
    .then((result) => converter.makeHtml(result))
    .then((result) => {
        $('#' + id  + ' > .description').append(result);
    });
}
