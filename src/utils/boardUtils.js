const DEFAULT_COLUMNS = ['Backlog', 'In Progress', 'Review', 'Done'];

function createBoard(name) {
    const columns = DEFAULT_COLUMNS.map(col => ({ name: col, tasks: [] }));
    return { name, columns };
}

function createTask(title, columnId, priority) {
    const id = Date.now() + Math.random().toString();
    return { id, title, columnId, priority, dueDate: null };
}

function getOverdueTasks(board) {
    const now = Date.now();
    return board.columns.flatMap(column => column.tasks.filter(task => task.dueDate && task.dueDate < now));
}

function getBoardStats(board) {
    const tasks = board.columns.flatMap(column => column.tasks);
    const total = tasks.length;
    const byPriority = tasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
    }, { high: 0, med: 0, low: 0 });
    const percentDone = (board.columns.find(col => col.name === 'Done').tasks.length / total) * 100 || 0;
    const overdueCount = getOverdueTasks(board).length;
    return { total, byPriority, percentDone, overdueCount };
}

function moveTask(board, taskId, toColumnId) {
    const newBoard = JSON.parse(JSON.stringify(board));
    let taskToMove = null;
    for (const column of newBoard.columns) {
        const taskIndex = column.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            taskToMove = column.tasks.splice(taskIndex, 1)[0];
            break;
        }
    }
    if (taskToMove) {
        const targetColumn = newBoard.columns.find(column => column.name === toColumnId);
        if (targetColumn) {
            targetColumn.tasks.push(taskToMove);
        }
    }
    return newBoard;
}

module.exports = { createBoard, createTask, getOverdueTasks, getBoardStats, moveTask };