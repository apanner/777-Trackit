import React from 'react';
import { useStore } from '../../store/useStore';
import { TaskListItem } from './TaskListItem';
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react';

interface TaskListByProjectProps {
  isAdmin: boolean;
}

export function TaskListByProject({ isAdmin }: TaskListByProjectProps) {
  const { tasks, projects } = useStore();
  const [expandedProjects, setExpandedProjects] = React.useState<Set<string>>(new Set());

  // Group tasks by project
  const { projectTasks, unassignedTasks } = tasks.reduce(
    (acc, task) => {
      if (task.projectId && projects.find(p => p.id === task.projectId)) {
        if (!acc.projectTasks[task.projectId]) {
          acc.projectTasks[task.projectId] = [];
        }
        acc.projectTasks[task.projectId].push(task);
      } else {
        acc.unassignedTasks.push(task);
      }
      return acc;
    },
    { projectTasks: {} as Record<string, typeof tasks>, unassignedTasks: [] as typeof tasks }
  );

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Project Tasks */}
      {projects.map(project => {
        const projectTaskList = projectTasks[project.id] || [];
        const isExpanded = expandedProjects.has(project.id);

        if (projectTaskList.length === 0) return null;

        return (
          <div key={project.id} className="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden">
            <div
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition-colors"
              onClick={() => toggleProject(project.id)}
            >
              <div className="flex items-center space-x-3">
                {isExpanded ? (
                  <ChevronUp className="text-gray-400" size={20} />
                ) : (
                  <ChevronDown className="text-gray-400" size={20} />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">{project.name}</h3>
                  <p className="text-sm text-gray-400">{projectTaskList.length} tasks</p>
                </div>
              </div>
              <div className={`px-3 py-1 text-sm rounded-full ${
                project.status === 'Active' ? 'bg-blue-500' :
                project.status === 'Completed' ? 'bg-green-500' :
                'bg-orange-500'
              } text-white`}>
                {project.status}
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-gray-700">
                <div className="p-4 space-y-4">
                  {projectTaskList.map(task => (
                    <TaskListItem
                      key={task.id}
                      task={task}
                      isAdmin={isAdmin}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Unassigned Tasks */}
      {unassignedTasks.length > 0 && (
        <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <Briefcase className="text-gray-400" size={20} />
              <div>
                <h3 className="text-lg font-semibold text-gray-200">Other Tasks</h3>
                <p className="text-sm text-gray-400">{unassignedTasks.length} unassigned tasks</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-4">
            {unassignedTasks.map(task => (
              <TaskListItem
                key={task.id}
                task={task}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}