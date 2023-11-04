from django import forms


class FirstPageForm(forms.Form):
    profile_pic = forms.ImageField(required = False)
    your_name = forms.CharField(max_length=100)
    CHOICES = [('M','Male'),('F','Female')]
    gender=forms.CharField(label='Gender', widget=forms.RadioSelect(choices=CHOICES))
    birth_date = forms.DateField(label='Birth date', input_formats=['%Y-%m-%d', '%d.%m.%Y'])
    telega = forms.CharField()
    phone_num = forms.CharField(max_length=12, min_length=12)
    O_sebe = forms.CharField()
