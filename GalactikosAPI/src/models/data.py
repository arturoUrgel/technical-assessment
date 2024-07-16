import json
import re
import os
from src.utils.scoringRules import scoring_rules

file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../app.js"))


def get_matches_from_file():
    with open(file_path, "r") as file:
        js_content = file.read()

        match_array = re.search(r"\[\s*([^;]*)\s*\]\s*;", js_content, re.DOTALL)

        if match_array:
            js_array = match_array.group(1).strip()

            js_array = re.sub(r",\s*$", "", js_array)

            fixed_json = re.sub(r"([{,]\s*)(\w+)(\s*:)", r'\1"\2"\3', js_array)

            try:
                python_list = json.loads("[" + fixed_json + "]")
                return python_list
            except json.JSONDecodeError as e:
                print(f"Error JSON decode: {e}")
                return []
        else:
            print("Array not found")
            return []


def save_matches_to_file(matches):
    js_array = json.dumps(matches, indent=2)

    js_array = re.sub(r'"([^"]+)":', r"\1:", js_array)

    js_content = f"const matches = {js_array};\n"

    with open(file_path, "w") as file:
        file.write(js_content)


def add_match(team_name, goals, yellow_cards, shots):
    match = {
        "team": team_name,
        "goals": goals,
        "yellow_cards": yellow_cards,
        "shots": shots,
    }
    matches = get_matches_from_file()
    matches.append(match)
    save_matches_to_file(matches)
    print(f"Match for {team_name} added successfully.")
    return match


def update_match_goals(team_name, new_goals):
    matches = get_matches_from_file()
    for match in matches:
        if match["team"] == team_name:
            match["goals"] = new_goals
            save_matches_to_file(matches)
            print(f"Goals updated for match of {team_name}.")
            return


def delete_match(team_name):
    matches = get_matches_from_file()
    matches = [match for match in matches if match["team"] != team_name]
    save_matches_to_file(matches)
    print(f"Match for {team_name} deleted successfully.")


def get_matches():
    return get_matches_from_file()


def getCalculatedMatches():
    calculated_matches = []
    total_score = 0
    for match in get_matches_from_file():
        score = scoring_rules(match["goals"], match["yellow_cards"], match["shots"])
        total_score = total_score + score
        calculated_match = {
            "team": match["team"],
            "score": score,
            "totalScore": total_score,
        }
        calculated_matches.append(calculated_match)
    return calculated_matches


def getMatchesSummary():
    matches = get_matches_from_file()
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
