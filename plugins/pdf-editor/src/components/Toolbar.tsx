import type { ToolId } from '../pdf/types';

interface Props {
  tool: ToolId;
  onToolChange: (tool: ToolId) => void;
  onOpenFile: () => void;
  onSignature: () => void;
  onExport: () => void;
  hasDocument: boolean;
  exporting: boolean;
}

export function Toolbar({
  tool,
  onToolChange,
  onOpenFile,
  onSignature,
  onExport,
  hasDocument,
  exporting,
}: Props) {
  return (
    <header className="pdfe-toolbar">
      <div className="pdfe-toolbar-group">
        <strong className="pdfe-brand">PDF Editor</strong>
        <button type="button" onClick={onOpenFile} className="pdfe-btn">
          Open PDF…
        </button>
      </div>

      <div className="pdfe-toolbar-group">
        <button
          type="button"
          className={`pdfe-btn ${tool === 'select' ? 'active' : ''}`}
          onClick={() => onToolChange('select')}
          disabled={!hasDocument}
        >
          Select
        </button>
        <button
          type="button"
          className={`pdfe-btn ${tool === 'text' ? 'active' : ''}`}
          onClick={() => onToolChange('text')}
          disabled={!hasDocument}
        >
          Text
        </button>
        <button
          type="button"
          className="pdfe-btn"
          onClick={onSignature}
          disabled={!hasDocument}
        >
          Signature…
        </button>
      </div>

      <div className="pdfe-toolbar-group">
        <button
          type="button"
          className="pdfe-btn-primary"
          onClick={onExport}
          disabled={!hasDocument || exporting}
        >
          {exporting ? 'Exporting…' : 'Export PDF'}
        </button>
      </div>
    </header>
  );
}
