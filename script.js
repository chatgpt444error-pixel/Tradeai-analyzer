const analyzeButton = document.getElementById("analyzeButton");
const chartInput = document.getElementById("chartInput");
const analysisResult = document.getElementById("analysisResult");

async function analyzeTrade() {
    if (!chartInput || !chartInput.files || !chartInput.files[0]) {
        analysisResult.innerHTML = `
            <div class="error">
                <h3>No chart selected</h3>
                <p>Please upload a trading chart first.</p>
            </div>
        `;
        return;
    }

    const formData = new FormData();
    formData.append("image", chartInput.files[0]);

    analysisResult.innerHTML = `
        <div class="loading">
            <h3>Analyzing chart...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message ||
                data.error ||
                `Server error: ${response.status}`
            );
        }

        displayAnalysis(data.analysis);

    } catch (error) {
        console.error("Analysis error:", error);

        analysisResult.innerHTML = `
            <div class="error">
                <h3>Analysis failed</h3>
                <p>${error.message}</p>
                <small>Make sure the backend is running and /api/analyze is available.</small>
            </div>
        `;
    }
}

function displayAnalysis(analysis) {
    if (!analysis) {
        throw new Error("No analysis was returned.");
    }

    analysisResult.innerHTML = `
        <div class="analysis-card">

            <h3>📊 Trade Analysis</h3>

            <div class="analysis-row">
                <strong>Market</strong>
                <span>${analysis.market || "Not detected"}</span>
            </div>

            <div class="analysis-row">
                <strong>Timeframe</strong>
                <span>${analysis.timeframe || "Not detected"}</span>
            </div>

            <div class="analysis-row">
                <strong>Trend</strong>
                <span>${analysis.trend || "Neutral"}</span>
            </div>

            <div class="analysis-row">
                <strong>Structure</strong>
                <span>${analysis.structure || "Not confirmed"}</span>
            </div>

            <div class="analysis-row">
                <strong>Support</strong>
                <span>${analysis.support || "Not identified"}</span>
            </div>

            <div class="analysis-row">
                <strong>Resistance</strong>
                <span>${analysis.resistance || "Not identified"}</span>
            </div>

            <div class="analysis-row">
                <strong>Entry</strong>
                <span>${analysis.entry || "Wait for confirmation"}</span>
            </div>

            <div class="analysis-row">
                <strong>Stop Loss</strong>
                <span>${analysis.stopLoss || "Place beyond invalidation level"}</span>
            </div>

            <div class="analysis-row">
                <strong>Take Profit</strong>
                <span>${analysis.takeProfit || "Use previous structure levels"}</span>
            </div>

            <div class="analysis-row">
                <strong>Risk / Reward</strong>
                <span>${analysis.riskReward || "Minimum 1:2 recommended"}</span>
            </div>

            <div class="analysis-row">
                <strong>Bias</strong>
                <span>${analysis.bias || "NEUTRAL"}</span>
            </div>

            <div class="analysis-row">
                <strong>Confidence</strong>
                <span>${analysis.confidence ?? 50}%</span>
            </div>

            <div class="warning">
                ⚠️ ${analysis.warning || "This is analysis assistance, not financial advice."}
            </div>

        </div>
    `;
}

if (analyzeButton) {
    analyzeButton.addEventListener("click", analyzeTrade);
}