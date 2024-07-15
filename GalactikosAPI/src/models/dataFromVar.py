# main_functions.py

from src.utils.scoringRules import scoring_rules

matches = [
    {"team": "TeamA", "goals": 3, "yellow_cards": 1, "shots": 2},
    {"team": "TeamB", "goals": 2, "yellow_cards": 2, "shots": 4},
    {"team": "TeamC", "goals": 1, "yellow_cards": 0, "shots": 3},
]


def add_match(team_name, goals, yellow_cards, shots):
    match = {
        "team": team_name,
        "goals": goals,
        "yellow_cards": yellow_cards,
        "shots": shots,
    }
    matches.append(match)
    print(f"Match for {team_name} added successfully.")
    return match


def update_match_goals(team_name, new_goals):
    for match in matches:
        if match["team"] == team_name:
            match["goals"] = new_goals
            print(f"Goals updated for match of {team_name}.")


def delete_match(team_name):
    global matches
    matches = [match for match in matches if match["team"] != team_name]
    print(f"Match for {team_name} deleted successfully.")


def get_matches():
    return matches


def getCalculatedMatches():
    calculated_matches = []
    for match in matches:
        score = scoring_rules(match["goals"], match["yellow_cards"], match["shots"])
        calculated_match = {"team": match["team"], "score": score}
        calculated_matches.append(calculated_match)
    return calculated_matches


def getMatchesSummary():
    total_matches = len(matches)
    total_score_calculated = sum(
        scoring_rules(match["goals"], match["yellow_cards"], match["shots"])
        for match in matches
    )

    summary = {
        "total_matches": total_matches,
        "total_score_calculated": total_score_calculated,
    }

    return summary
