// ============================================================
// TRADING CHART SCREENSHOT ANALYZER
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const app = document.createElement("div");

  app.innerHTML = `
    <div id="tradingAnalyzer">

      <div class="ta-header">
        <h1>Trading Chart Analyzer</h1>
        <p>Upload a screenshot of your trading chart for analysis.</p>
      </div>

      <div class="ta-upload">
        <input
          type="file"
          id="chartInput"
          accept="image/png,image/jpeg,image/webp"
          hidden
        />

        <label for="chartInput" class="upload-button">
          📷 Upload Trading Chart
        </label>

        <p id="fileName">No chart selected</p>

        <img id="chartPreview" style="display:none;" />
      </div>

      <button id="analyzeButton" disabled>
        🔍 Analyze Chart
      </button>

      <div id="loading" style="display:none;">
        <div class="spinner"></div>
        <p>Analyzing market structure...</p>
      </div>

      <div id="results" style="display:none;">

        <div class="signal-card">
          <span>MARKET SIGNAL</span>
          <strong id="signal">WAIT</strong>
        </div>

        <div class="analysis-grid">

          <div class="analysis-box">
            <small>Trend</small>
            <strong id="trend">—</strong>
          </div>

          <div class="analysis-box">
            <small>Confidence</small>
            <strong id="confidence">—</strong>
          </div>

          <div class="analysis-box">
            <small>Entry</small>
            <strong id="entry">—</strong>
          </div>

          <div class="analysis-box">
            <small>Stop Loss</small>
            <strong id="stopLoss">—</strong>
          </div>

          <div class="analysis-box">
            <small>Take Profit</small>
            <strong id="takeProfit">—</strong>
          </div>

          <div class="analysis-box">
            <small>Risk / Reward</small>
            <strong id="riskReward">—</strong>
          </div>

        </div>

        <div class="detail-card">
          <h2>Market Structure</h2>
          <p id="structure">—</p>
        </div>

        <div class="detail-card">
          <h2>Support & Resistance</h2>
          <p id="levels">—</p>
        </div>

        <div class="detail-card">
          <h2>Trade Reasoning</h2>
          <p id="reasoning">—</p>
        </div>

        <div class="warning">
          ⚠️ This is analysis, not financial advice. Always confirm the setup