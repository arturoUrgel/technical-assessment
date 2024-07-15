from flask import Blueprint, request, jsonify
from src.controllers.MatchService import MatchService
from src.utils.errors_handler import CustomError, BadRequestError, NotFoundError

main = Blueprint("match_blueprint", __name__)


@main.route("/", methods=["GET"])
def get_matches():
    try:
        matches = MatchService.get_matches()
        summary = MatchService.get_summary()
        return jsonify({"succes": True, "matches": matches, "summary": summary})
    except CustomError as e:
        return jsonify({"success": False, "message": e.message}), e.status_code

    except Exception as e:
        print("get_matches", e)
        return jsonify({"success": False, "message": "Internal server error."}), 500


@main.route("/detail/<int:id>", methods=["GET"])
def get_match(id):
    return jsonify(MatchService.match_detail(id))


@main.route("/", methods=["POST"])
def post_match():
    try:
        data = request.get_json()
        team = data.get("team")
        goals = data.get("goals")
        yellow_cards = data.get("yellow_cards")
        shots = data.get("shots")

        match = MatchService.post_match(team, goals, yellow_cards, shots)

        return jsonify(
            {
                "success": True,
                "match": match,
            }
        )

    except BadRequestError as e:
        return jsonify({"success": False, "message": e.message}), e.status_code

    except Exception as e:
        print("post_match", e)
        return jsonify({"success": False, "message": "Internal server error."}), 500


@main.route("/", methods=["PATCH"])
def patch_match():

    return jsonify({"success": True, "message": "Match updated successfully"})
