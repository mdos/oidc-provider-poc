from locust import HttpLocust, TaskSet, task

class RootBehavior(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        self.logout()

    def login(self):
        """ self.client.post("/login", {"username":"ellen_key", "password":"education"}) """

    def logout(self):
        """ self.client.post("/logout", {"username":"ellen_key", "password":"education"}) """

    @task(1)
    def test_profile(self):
        self.client.get("/")

class WebsiteUser(HttpLocust):
    task_set = RootBehavior
    min_wait = 5000
    max_wait = 9000

