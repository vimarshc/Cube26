from django.shortcuts import render, render_to_response
from django.template import RequestContext

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from django.conf import settings

from urlparse import urlparse
import json, urllib2, logging

# Create your views here.
# renders landing page
def render_landing_page(request, template="templates/web/landingpage.html"):
	"""
	Renders landing page
	"""
	#logger.debug("Landing page rendered!")
	return render(request, template, context_instance=RequestContext(request))