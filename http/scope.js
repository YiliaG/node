var globalVariable = 'This is global variable';

function globalFunction() {
    var localVariable = 'This is local variable';

    console.log('Visit global/local variable');
    console.log(globalVariable);
    console.log(localVariable);

    function localFunction() {
        var innerLocalVariable = 'This is inner local variable';

        console.log('Visit global/local/innnerLocal variable');
        console.log(globalVariable);
        console.log(localVariable);
        console.log(innerLocalVariable);
    }

    localFunction();
}
globalFunction();