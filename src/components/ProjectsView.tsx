import React, { useState, useEffect } from 'react';
import { Rocket, LogOut, ArrowLeft, CheckCircle, Lightbulb, Wrench, FlaskConical, Pause, X as XIcon, BarChart3, Crown, Calendar, Users, DollarSign, ExternalLink, TrendingUp, Filter, Search } from 'lucide-react';
import { Button } from './ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ProjectStatusSelector } from './ui/ProjectStatusSelector';
import { ProjectMetricsModal } from './ui/ProjectMetricsModal';

interface ProjectIdea {
  id: string;
  idea: string;
  viability_score: number;
  project_status: string;
  status_updated_at: string;
  created_at: string;
  validated_at?: string;
  launch_date?: string;
  launch_metrics?: any;
  business_domain?: string;
  analysis_result: any;
}

interface ProjectsViewProps {
  onBack: () => void;
  onViewReport: (project: ProjectIdea) => void;
  onShowSubscription: () => void;
}

const STATUS_CONFIG = {
  validated: { label: 'Validated', icon: CheckCircle, color: 'bg-emerald-500', count: 0 },
  planning: { label: 'Planning', icon: Lightbulb, color: 'bg-blue-500', count: 0 },
  building: { label: 'Building', icon: Wrench, color: 'bg-indigo-500', count: 0 },
  testing: { label: 'Testing', icon: FlaskConical, color: 'bg-amber-500', count: 0 },
  launched: { label: 'Launched', icon: Rocket, color: 'bg-purple-500', count: 0 },
  paused: { label: 'Paused', icon: Pause, color: 'bg-orange-500', count: 0 }
};

export function ProjectsView({ onBack, onViewReport, onShowSubscription }: ProjectsViewProps) {
  const { signOut } = useAuth();
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedProject, setSelectedProject] = useState<ProjectIdea | null>(null);
  const [showMetricsModal, setShowMetricsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setViewMode('list');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .in('project_status', ['validated', 'planning', 'building', 'testing', 'launched', 'paused'])
        .order('status_updated_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async () => {
    await loadProjects();
  };

  const getStatusCounts = () => {
    const counts = { ...STATUS_CONFIG };
    projects.forEach(project => {
      if (counts[project.project_status as keyof typeof STATUS_CONFIG]) {
        counts[project.project_status as keyof typeof STATUS_CONFIG].count++;
      }
    });
    return counts;
  };

  const getFilteredProjects = () => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.idea.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.project_status === statusFilter);
    }

    return filtered;
  };

  const getProjectsByStatus = (status: string) => {
    return getFilteredProjects().filter(p => p.project_status === status);
  };

  const getDaysInStatus = (statusUpdatedAt: string) => {
    const days = Math.floor(
      (new Date().getTime() - new Date(statusUpdatedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const ProjectCard = ({ project }: { project: ProjectIdea }) => {
    const days = getDaysInStatus(project.status_updated_at);
    const statusConfig = STATUS_CONFIG[project.project_status as keyof typeof STATUS_CONFIG];

    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4
              onClick={() => onViewReport(project)}
              className="text-white font-medium text-sm mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors"
            >
              {project.idea}
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              <div className={`text-xs px-2 py-1 rounded-full ${
                project.viability_score >= 8 ? 'bg-emerald-500/20 text-emerald-300' :
                project.viability_score >= 6 ? 'bg-amber-500/20 text-amber-300' :
                'bg-orange-500/20 text-orange-300'
              }`}>
                {project.viability_score}/10
              </div>
              <div className="text-xs text-slate-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {days}d
              </div>
            </div>
          </div>
        </div>

        {project.launch_metrics && (project.launch_metrics.user_count || project.launch_metrics.revenue) && (
          <div className="flex items-center gap-3 mb-3 text-xs">
            {project.launch_metrics.user_count && (
              <div className="flex items-center text-slate-300">
                <Users className="w-3 h-3 mr-1" />
                {project.launch_metrics.user_count.toLocaleString()}
              </div>
            )}
            {project.launch_metrics.revenue && (
              <div className="flex items-center text-slate-300">
                <DollarSign className="w-3 h-3 mr-1" />
                ${project.launch_metrics.revenue.toLocaleString()}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => onViewReport(project)}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs py-2"
          >
            View Details
          </Button>
          {project.project_status === 'launched' && (
            <Button
              size="sm"
              onClick={() => {
                setSelectedProject(project);
                setShowMetricsModal(true);
              }}
              className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs py-2 px-3"
            >
              <BarChart3 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  const statusCounts = getStatusCounts();
  const filteredProjects = getFilteredProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 sm:px-6 py-4 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex md:hidden items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                <Rocket className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <span className="text-sm font-bold text-white">LaunchScope</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={onBack}
                className="p-2 min-w-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                onClick={onShowSubscription}
                className="p-2 min-w-0"
              >
                <Crown className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                onClick={signOut}
                className="p-2 min-w-0"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Active Projects</h1>
                <p className="text-sm text-slate-300">Manage your startup ideas</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="secondary" size="sm" onClick={onShowSubscription}>
                <Crown className="w-4 h-4 mr-2" />
                Subscription
              </Button>
              <Button variant="secondary" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              All ({projects.length})
            </button>
            {Object.entries(statusCounts).map(([status, config]) => {
              const Icon = config.icon;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center ${
                    statusFilter === status
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  <span className="hidden sm:inline">{config.label}</span> ({config.count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
              className="hidden lg:flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition-all"
            >
              <Filter className="w-4 h-4 mr-2" />
              {viewMode === 'kanban' ? 'Kanban' : 'List'}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 max-w-md mx-auto">
              <Rocket className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Active Projects</h3>
              <p className="text-slate-300 mb-6">
                {searchQuery || statusFilter !== 'all'
                  ? 'No projects match your filters'
                  : 'Validate an idea to start tracking it as a project'}
              </p>
              <Button onClick={onBack}>
                Go to Dashboard
              </Button>
            </div>
          </div>
        ) : viewMode === 'kanban' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {Object.entries(statusCounts).map(([status, config]) => {
              const Icon = config.icon;
              const statusProjects = getProjectsByStatus(status);

              return (
                <div key={status} className="flex flex-col">
                  <div className={`${config.color} rounded-t-xl p-4 flex items-center justify-between`}>
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 text-white mr-2" />
                      <span className="font-semibold text-white">{config.label}</span>
                    </div>
                    <span className="bg-white/20 px-2.5 py-1 rounded-full text-sm font-medium text-white">
                      {statusProjects.length}
                    </span>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border-x border-b border-white/10 rounded-b-xl p-4 space-y-3 min-h-[200px] flex-1">
                    {statusProjects.length === 0 ? (
                      <div className="flex items-center justify-center py-8 text-slate-400 text-sm">
                        No projects in {config.label.toLowerCase()}
                      </div>
                    ) : (
                      statusProjects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map(project => {
              const statusConfig = STATUS_CONFIG[project.project_status as keyof typeof STATUS_CONFIG];
              const Icon = statusConfig?.icon || Rocket;
              const days = getDaysInStatus(project.status_updated_at);

              return (
                <div
                  key={project.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 ${statusConfig?.color || 'bg-slate-500'} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            onClick={() => onViewReport(project)}
                            className="text-white font-semibold text-lg mb-2 line-clamp-2 cursor-pointer hover:text-blue-300 transition-colors"
                          >
                            {project.idea}
                          </h3>
                          <div className="flex items-center gap-3 flex-wrap text-sm">
                            <div className={`px-3 py-1 rounded-full ${
                              project.viability_score >= 8 ? 'bg-emerald-500/20 text-emerald-300' :
                              project.viability_score >= 6 ? 'bg-amber-500/20 text-amber-300' :
                              'bg-orange-500/20 text-orange-300'
                            }`}>
                              Viability: {project.viability_score}/10
                            </div>
                            <div className="text-slate-400 flex items-center">
                              <Calendar className="w-4 h-4 mr-1.5" />
                              {days} days in {statusConfig?.label.toLowerCase()}
                            </div>
                            {project.launch_metrics?.user_count && (
                              <div className="text-slate-300 flex items-center">
                                <Users className="w-4 h-4 mr-1.5" />
                                {project.launch_metrics.user_count.toLocaleString()} users
                              </div>
                            )}
                            {project.launch_metrics?.revenue && (
                              <div className="text-slate-300 flex items-center">
                                <DollarSign className="w-4 h-4 mr-1.5" />
                                ${project.launch_metrics.revenue.toLocaleString()}/mo
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <ProjectStatusSelector
                        analysisId={project.id}
                        currentStatus={project.project_status}
                        onStatusChange={handleStatusChange}
                        compact={true}
                      />
                      <Button
                        onClick={() => onViewReport(project)}
                        className="bg-white/10 hover:bg-white/20 text-white"
                      >
                        View Details
                      </Button>
                      {project.project_status === 'launched' && (
                        <Button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowMetricsModal(true);
                          }}
                          className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300"
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Metrics
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {selectedProject && (
        <ProjectMetricsModal
          isOpen={showMetricsModal}
          onClose={() => {
            setShowMetricsModal(false);
            setSelectedProject(null);
          }}
          analysisId={selectedProject.id}
          ideaName={selectedProject.idea}
          currentMetrics={selectedProject.launch_metrics}
          onUpdate={loadProjects}
        />
      )}
    </div>
  );
}
