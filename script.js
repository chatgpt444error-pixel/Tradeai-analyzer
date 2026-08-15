try {
    const response = await fetch(
        "https://tradeai-analyzer.onrender.com/api/analyze",
        {
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
        displayAnalysis(data.analysis);
    } else {
        throw new Error(data.error || "Analysis failed");
    }

} catch (error) {
    console.error("Analysis error:", error);

    analysisResult.innerHTML = `
        <div class="error">
            <h3>Analysis failed</h3>
            <p>${error.message}</p>
        </div>
    `;
}