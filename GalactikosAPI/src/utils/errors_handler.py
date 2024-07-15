class CustomError(Exception):
    def __init__(self, message, status_code):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class NotFoundError(CustomError):
    def __init__(self, resource):
        message = resource
        super().__init__(message, 404)


class BadRequestError(CustomError):
    def __init__(self, message):
        super().__init__(message, 400)
