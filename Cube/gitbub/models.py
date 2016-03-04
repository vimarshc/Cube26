from __future__ import unicode_literals

from django.db import models



#Comments are being saved in this model. 
#DB stores the comment and the username 
#from the form. 
class Comment(models.Model):

	comment = models.TextField(max_length=15, null=True, blank=True)
	user = models.CharField(max_length=200, null=True, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)

	def __unicode__(self):

		return "%s<----->%s" %(self.user, self.comment)





