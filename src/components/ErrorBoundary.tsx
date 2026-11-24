import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'An unexpected display error occurred.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('UI ErrorBoundary caught error:', error, info);
  }

  handleRecover = () => {
    this.setState({ hasError: false, message: '' });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#e9f2fc] text-slate-900">
          <div className="w-full max-w-md bg-white border border-blue-200 rounded-xl shadow-sm overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-[#1d4ed8] via-sky-500 to-teal-500" />
            <div className="p-6 space-y-4">
              <h1 className="font-display text-lg font-semibold text-[#0f294d]">
                Something interrupted the workspace
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Don&apos;t worry — your saved progress is safe. Click below to
                restore the screen.
              </p>
              {this.state.message && (
                <p className="text-xs font-mono bg-blue-50 border border-blue-100 text-blue-900 p-2.5 rounded-lg break-words">
                  {this.state.message}
                </p>
              )}
              <button
                type="button"
                onClick={this.handleRecover}
                className="w-full min-h-[42px] px-4 py-2 bg-gradient-to-r from-[#1d4ed8] to-[#0284c7] hover:from-[#1e40af] hover:to-[#0369a1] text-white text-sm font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Workspace</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
