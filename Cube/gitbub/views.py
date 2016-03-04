from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from gitbub.models import Comment
from django.http import HttpResponse

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



#AJAX call to save comments in DB
@csrf_exempt
def dbsave(request):
	print("request.POST: %s" %request.POST)	
	if(request.method == 'POST'):		
		request_body = json.loads(request.body)
		# request_b = json.loads(request.POST)
		print(type(request.POST))
		#print(request_body); print(type(request_body));
		comment = Comment.objects.create(comment=request_body["body"], user=request_body["user"]["login"])
		print(comment)
		return HttpResponse("okay!")
	else:
		HttpResponse("Error")	
