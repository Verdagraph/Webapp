# External Libraries
import pytest

# VerdanTech Source
from src.adapters.email.client.aiosmtplib import AioSmtplibEmailClient
from src.adapters.email.client.generic import BaseEmailClient


@pytest.fixture
def base_email_client():
    return BaseEmailClient(
        hostname="",
        port=0,
        username="",
        password="",
        sender="",
    )


@pytest.fixture
def aiosmtplib_client():
    return AioSmtplibEmailClient(
        hostname="",
        port=0,
        username="",
        password="",
        sender="",
    )
