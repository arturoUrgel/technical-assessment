from src.models.data import (
    get_matches,
    getMatchesSummary,
    getCalculatedMatches,
    add_match,
)
from src.utils.errors_handler import NotFoundError, BadRequestError


class MatchService:

    @classmethod
    def get_matches(cls):
        matches = getCalculatedMatches()
        return matches

    @classmethod
    def get_summary(cls):
        summary = getMatchesSummary()
        return summary

    @classmethod
    def post_match(cls, team, goals, yellow_cards, shots):
        cls.validate_match_data(team, goals, yellow_cards, shots)
        match_id = add_match(team, goals, yellow_cards, shots)
        return match_id

    @staticmethod
    def validate_match_data(team, goals, yellow_cards, shots):
        print(team, goals, yellow_cards, shots)
        if not team or not isinstance(team, str):
            raise BadRequestError("Team name is required and must be a string")
        if goals is not None and (not isinstance(goals, int) or goals < 0):
            raise BadRequestError("Goals must be a non-negative integer")
        if yellow_cards is not None and (
            not isinstance(yellow_cards, int) or yellow_cards < 0
        ):
            raise BadRequestError("Yellow cards must be a non-negative integer")
        if shots is not None and (not isinstance(shots, int) or shots < 0):
            raise BadRequestError("Shots must be a non-negative integer")

    @classmethod
    def patch_match(cls):
        return "6165161"

    @classmethod
    def match_detail(cls, id):
        return {"success": True, "id": id}
