import pandas as pd
import matplotlib.pyplot as plt
from strategy.sniper_strategy import evaluate_trade

def run_backtest(label, filepath, plot_name):
    print(f"--- Running on {label} ---")
    df = pd.read_csv(filepath)
    streak_counter = 0
    max_streak = 0
    streaks = []

    for _, row in df.iterrows():
        result = evaluate_trade(row)
        if result == 'WIN':
            streak_counter += 1
        else:
            if streak_counter > 0:
                streaks.append(streak_counter)
                max_streak = max(max_streak, streak_counter)
            streak_counter = 0

    if streak_counter > 0:
        streaks.append(streak_counter)
        max_streak = max(max_streak, streak_counter)

    dist = pd.Series(streaks).value_counts().sort_index()
    print(dist)
    plt.figure(figsize=(10, 5))
    dist.plot(kind='bar', title=f'{label} Win Streak Distribution', color='green')
    plt.xlabel('Streak Length')
    plt.ylabel('Frequency')
    plt.grid(axis='y')
    plt.tight_layout()
    plt.savefig(f"plots/{plot_name}")
    print(f"📈 Saved: plots/{plot_name}")
    print(f"🔥 Max Streak ({label}): {max_streak}\\n")

if __name__ == "__main__":
    run_backtest("Binance", "data/sample_data.csv", "win_streak_binance.png")
    run_backtest("Deriv", "data/sample_data_deriv.csv", "win_streak_deriv.png")
