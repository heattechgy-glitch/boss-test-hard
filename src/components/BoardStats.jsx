import React, { useEffect, useState } from 'react';

const BoardStats = ({ board }) => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    priorityCounts: { high: 0, medium: 0, low: 0 },
    percentComplete: 0,
    overdueCount: 0,
  });

  useEffect(() => {
    const calculateStats = () => {
      const tasks = board.tasks || [];
      const now = new Date();

      const totalTasks = tasks.length;
      const priorityCounts = tasks.reduce(
        (acc, task) => {
          acc[task.priority] = (acc[task.priority] || 0) + 1;
          return acc;
        },
        { high: 0, medium: 0, low: 0 }
      );

      const completedTasks = tasks.filter(task => task.status === 'done').length;
      const percentComplete = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

      const overdueCount = tasks.filter(task => new Date(task.dueDate) < now && task.status !== 'done').length;

      setStats({ totalTasks, priorityCounts, percentComplete, overdueCount });
    };

    calculateStats();

    const interval = setInterval(calculateStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [board]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
      <div>
        <span role="img" aria-label="tasks">📋</span> Total Tasks: {stats.totalTasks}
      </div>
      <div>
        <span role="img" aria-label="high-priority">🔴</span> High: {stats.priorityCounts.high}
      </div>
      <div>
        <span role="img" aria-label="medium-priority">🟡</span> Medium: {stats.priorityCounts.medium}
      </div>
      <div>
        <span role="img" aria-label="low-priority">🟢</span> Low: {stats.priorityCounts.low}
      </div>
      <div>
        <span role="img" aria-label="percent-complete">✅</span> Complete: {stats.percentComplete}%
      </div>
      <div>
        <span role="img" aria-label="overdue">⏰</span> Overdue: {stats.overdueCount}
      </div>
    </div>
  );
};

export default BoardStats;
