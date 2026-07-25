# this is our configuration file, it will manage all the configuration of our backend.

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.5-flash"

    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"

    CHUNK_SIZE: int = 2000
    CHUNK_OVERLAP: int = 500
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173,chrome-extension://*"
    ALLOW_ORIGIN_REGEX: str = r"^chrome-extension://[a-zA-Z0-9_-]+$"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

    @property
    def allowed_origins(self) -> list[str]:
        return [value.strip() for value in self.ALLOWED_ORIGINS.split(",") if value.strip()]


settings = Settings()