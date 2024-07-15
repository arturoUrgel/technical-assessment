def scoring_rules(goals, yellow_cards, shots):

    score = (goals * 30) + (yellow_cards * -5) + (shots * 5)
    return score
