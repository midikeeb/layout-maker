const notes = ['C', 'Cs', 'D', 'Ds', 'E', 'F', 'Fs', 'G', 'Gs', 'A', 'As', 'B']

const getValues = function(){
    var rows = parseInt(document.getElementById("rows-select").value);
    var cols = parseInt(document.getElementById("columns-select").value);
    var interval = document.getElementById("interval-select").value;
    if(interval == "Fourth"){
        interval = 5;
    } else if (interval == "Fifth"){
        interval = 7;
    } else if (interval == "Octave"){
        interval = 12;
    }
    var direction = document.getElementById("direction-select").value;
    var handedness = document.getElementById("handedness-select").value;
    var lowest = notes.indexOf(document.getElementById("lowest-select").value);

    return {
        'rows': rows,
        'cols': cols,
        'interval': interval,
        'direction': direction,
        'handedness': handedness,
        'lowest': lowest
    };
}

document.getElementById('keeb-submit').onclick = function (event){
    event.preventDefault();

    var {rows, cols, interval, direction, handedness, lowest} = getValues();
    let layout = `LAYOUT_ortho_${rows}x${cols}(\n`;
    
    var board = [...Array(rows).keys()].map( r => 
        [...Array(cols).keys()].map(
            ind => ind + (r*interval)
        ).map(ind => 
            (lowest + ind)
        ).map(ind =>
            `\tMI_${notes[ind%12]}` + (Math.floor(ind/12) == 0 ? '' : `_${Math.floor(ind/12)}`)
        )
    ).map(
        noteArray =>
        handedness == "Right" ? noteArray : noteArray.reverse()
    ).map(
        noteArray =>
        noteArray.join(", ")
    )
    if(direction=="Ascending"){
        board.reverse()
    }
    board = board.join(",\n")
    
    console.log(board);
    layout += board + "\n)"
    document.getElementById("firmware-layout").value = layout;
    console.log(JSON.stringify({
        'rows': rows,
        'cols': cols,
        'interval': interval,
        'direction': direction,
        'handedness': handedness,
        'lowest': lowest
    }));
}