class TranscriptError(Exception):
    """Base Exception for transcript-related error"""
    pass

class TranscriptNotFoundError(TranscriptError):
    """Raised when no transcript exists for a video."""
    pass

class TranscriptDisabledError(TranscriptError):
    """Raised when transcripts are disabled for a video"""

class VideoUnavailableError(TranscriptError):
    """Raised when the YouTube video is unavailable"""
    pass