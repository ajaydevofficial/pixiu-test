from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


def index(request):
    context = {}
    if not request.user.is_authenticated:
        return redirect('/login')
    return render(request,'index.html',context)

def login_page(request):
    context = {
        'error': None
    }
    if request.user.is_authenticated:
        return redirect('/')
    if request.method=='POST':
        try:
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(
                username = username, 
                password = password
            )
            if user is not None:
                context['error'] = None
                login(request, user)
                return redirect('/')
            else:
                print('Failed to login')
                context['error'] = 'Invalid credentials'
        except Exception as e:
            print('Error on login {}'.format(e))
            context['error'] = 'Invalid credentials'
    return render(request,'login.html',context)    

def register(request):
    context = {
        'error': None
    }
    if request.user.is_authenticated:
        return redirect('/')
    if request.method=='POST':
        try:
            first_name = request.POST['first_name']
            username = request.POST['username']
            last_name = request.POST['last_name']
            password = request.POST['password']
            user = User.objects.create(
                first_name = first_name,
                last_name = last_name,
                username = username
            )
            user.set_password(password)
            user.save()
            context['error'] = None
            return redirect('/login')
        except Exception as e:
            print('Failed to create user {}'.format(e))
            context['error'] = "Registration failed! Try again later"
    return render(request,'register.html',context)

def logout_page(request):
    try:
        context = {}
        logout(request)
        return redirect('/login')
    except Exception as e:
        print('Failed to logout: ',e)

def notifications(request):
    context = {
        'error': None
    }
    return render(request, 'notifications.html', context)

def notification_single(request):
    context = {
        'error': None
    }
    return render(request, 'notification-single-view.html', context)
        