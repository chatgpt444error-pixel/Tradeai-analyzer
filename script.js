// ============================================================
// TRADEAI ANALYZER - FRONTEND
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const app = document.createElement("div");

  app.innerHTML = `
    <div id="tradeai-app">

      <div class="ta-header">
        <div>
          <h1>TradeAI Analyzer</h1>
          <p>AI-powered trading chart analysis</p>
        </div>
        <div class="ta-status">
          <span></span> SYSTEM READY
        </div>
      </div>

      <div class="ta-dashboard">

        <div class="ta-card upload-card">

          <h2>📊 Chart Analysis</h2>

          <p class="ta-help">
            Upload a screenshot of your trading chart.
          </p>

          <input
            type="file"
            id="chartInput"
            accept="image/png,image/jpeg,image/webp"
          />

          <label for="chartInput" class="upload-button">
            📷 SELECT CHART
          </label>

          <div id="previewArea" class="preview-area">
            <p>No chart selected</p>
          </div>

          <button id="analyzeButton" class="analyze-button" disabled>
            ANALYZE TRADE
          </button>

        </div>

        <div class="ta-card">

          <h2>📈 Market Analysis</h2>

          <div id="analysisStatus" class="analysis-status">
            Upload a chart and press <b>ANALYZE TRADE</b>.
          </div>

          <div id="analysisResult" class="analysis-result">

            <div class="result-grid">

              <div class="result-box">
                <span>MARKET</span>
                <strong id="marketValue">—</strong>
              </div>

              <div class="result-box">
                <span>BIAS</span>
                <strong id="biasValue">—</strong>
              </div>

              <div class="result-box">
                <span>ENTRY</span>
                <strong id="entryValue">—</strong>
              </div>

              <div class="result-box">
                <span>STOP LOSS</span>
                <strong id="stopValue">—</strong>
              </div>

              <div class="result-box">
                <span>TAKE PROFIT</span>
                <strong id="targetValue">—</strong>
              </div>

              <div class="result-box">
                <span>RISK / REWARD</span>
                <strong id="rrValue">—</strong>
              </div>

            </div>

            <div class="analysis-text">
              <h3>AI Reasoning</h3>
              <div id="reasoningValue">
                Waiting for analysis...
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;

  document.body.appendChild(app);


  // ==========================================================
  // STYLES
  // ==========================================================

  const style = document.createElement("style");

  style.textContent = `

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #070b12;
      color: #e8edf5;
      font-family: Arial, Helvetica, sans-serif;
    }

    #tradeai-app {
      width: 100%;
      max-width: 1100px;
      margin: auto;
      padding: 25px;
    }

    .ta-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      padding: 25px;
      margin-bottom: 20px;
      background: #0d1420;
      border: 1px solid #202c3c;
      border-radius: 16px;
    }

    .ta-header h1 {
      margin: 0;
      font-size: 30px;
    }

    .ta-header p {
      margin: 8px 0 0;
      color: #8d9aad;
    }

    .ta-status {
      font-size: 12px;
      color: #31d49b;
      white-space: nowrap;
    }

    .ta-status span {
      display: inline-block;
      width: 9px;
      height: 9px;
      background: #31d49b;
      border-radius: 50%;
      margin-right: 6px;
    }

    .ta-dashboard {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: 20px;
    }

    .ta-card {
      background: #0d1420;
      border: 1px solid #202c3c;
      border-radius: 16px;
      padding: 22px;
    }

    .ta-card h2 {
      margin-top: 0;
    }

    .ta-help {
      color: #8d9aad;
    }

    #chartInput {
      display: none;
    }

    .upload-button {
      display: block;
      text-align: center;
      padding: 16px;
      margin-top: 20px;
      background: #162235;
      border: 1px solid #33445c;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
    }

    .upload-button:active {
      transform: scale(.98);
    }

    .preview-area {
      margin-top: 20px;
      min-height: 180px;
      border: 1px dashed #33445c;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: #718096;
      background: #080e17;
    }

    .preview-area img {
      width: 100%;
      max-height: 420px;
      object-fit: contain;
      display: block;
    }

    .analyze-button {
      width: 100%;
      margin-top: 20px;
      padding: 17px;
      border: 0;
      border-radius: 10px;
      background: #19c987;
      color: #06100c;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .analyze-button:disabled {
      opacity: .4;
      cursor: not-allowed;
    }

    .analysis-status {
      padding: 14px;
      border-radius: 10px;
      background: #09101a;
      color: #9aa8bb;
      margin-bottom: 20px;
    }

    .result-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .result-box {
      background: #09101a;
      border: 1px solid #1c2939;
      border-radius: 10px;
      padding: 15px;
    }

    .result-box span {
      display: block;
      color: #728197;
      font-size: 11px;
      margin-bottom: 7px;
    }

    .result-box strong {
      font-size: 18px;
    }

    .analysis-text {
      margin-top: 20px;
      background: #09101a;
      border: 1px solid #1c2939;
      border-radius: 10px;
      padding: 17px;
    }

    .analysis-text h3 {
      margin-top: 0;
    }

    #reasoningValue {
      color: #aab5c5;
      line-height: 1.6;
      white-space: pre-wrap;
    }

    @media (max-width: 750px) {

      #tradeai-app {
        padding: 12px;
      }

      .ta-header {
        display: block;
      }

      .ta-status {
        margin-top: 15px;
      }

      .ta-dashboard {
        grid-template-columns: 1fr;
      }

    }

  `;

  document.head.appendChild(style);


  // ==========================================================
  // ELEMENTS
  // ==========================================================

  const input = document.getElementById("chartInput");
  const preview = document.getElementById("previewArea");
  const analyzeButton = document.getElementById("analyzeButton");
  const status = document.getElementById("analysisStatus");


  // ==========================================================
  // IMAGE SELECTION
  // ==========================================================

  input.addEventListener("change", () => {

    const file = input.files[0];

    if (!file) {
      analyzeButton.disabled = true;
      preview.innerHTML = "<p>No chart selected</p>";
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {

      preview.innerHTML = `
        <img
          src="${event.target.result}"
          alt="Trading chart preview"
        />
      `;

      analyzeButton.disabled = false;

      status.innerHTML =
        "Chart loaded. Press <b>ANALYZE TRADE</b>.";
    };

    reader.readAsDataURL(file);

  });


  // ==========================================================
  // ANALYZE
  // ==========================================================

  analyzeButton.addEventListener("click", async () => {

    const file = input.files[0];

    if (!file) {
      return;
    }

    analyzeButton.disabled = true;

    analyzeButton.textContent = "ANALYZING...";

    status.innerHTML =
      "⏳ Sending chart to TradeAI backend...";


    const formData = new FormData();

    formData.append("image", file);


    try {

      let response;

      // First try the main backend endpoint.
      try {

        response = await fetch("/analyze", {
          method: "POST",
          body: formData
        });

      } catch (error) {

        response = null;

      }


      // If /analyze doesn't exist, try /api/analyze.
      if (!response || response.status === 404) {

        response = await fetch("/api/analyze", {
          method: "POST",
          body: formData
        });

      }


      if (!response.ok) {

        const errorText = await response.text();

        throw new Error(
          "Backend returned HTTP " +
          response.status +
          ". " +
          errorText
        );

      }


      const data = await response.json();

      displayAnalysis(data);

      status.innerHTML =
        "✅ <b>Analysis complete.</b>";


    } catch (error) {

      console.error(error);

      status.innerHTML = `
        <b>❌ Analysis failed</b><br><br>
        ${escapeHtml(error.message)}
        <br><br>
        Your frontend is running, but the backend analysis endpoint
        is not responding correctly.
      `;

    }


    analyzeButton.disabled = false;

    analyzeButton.textContent = "ANALYZE TRADE";

  });


  // ==========================================================
  // DISPLAY ANALYSIS
  // ==========================================================

  function displayAnalysis(data) {

    const analysis =
      data.analysis ||
      data.result ||
      data.data ||
      data;


    document.getElementById("marketValue").textContent =
      analysis.market ||
      analysis.symbol ||
      analysis.asset ||
      "—";


    document.getElementById("biasValue").textContent =
      analysis.bias ||
      analysis.direction ||
      analysis.signal ||
      "—";


    document.getElementById("entryValue").textContent =
      analysis.entry ||
      analysis.entryPrice ||
      "—";


    document.getElementById("stopValue").textContent =
      analysis.stopLoss ||
      analysis.stop ||
      analysis.sl ||
      "—";


    document.getElementById("targetValue").textContent =
      analysis.takeProfit ||
      analysis.target ||
      analysis.tp ||
      "—";


    document.getElementById("rrValue").textContent =
      analysis.riskReward ||
      analysis.rr ||
      analysis.risk_reward ||
      "—";


    document.getElementById("reasoningValue").textContent =
      analysis.reasoning ||
      analysis.explanation ||
      analysis.analysis ||
      analysis.message ||
      JSON.stringify(analysis, null, 2);

  }


  // ==========================================================
  // SECURITY
  // ==========================================================

  function escapeHtml(text) {

    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }

});