'''
ARS
'''


class ARS:
    def __init__(self):
        """
        Creates list of residents.
        """
        self.residents = ['Jayden', "Yuta", 'Michael', 'Madison', 'Haley',
                          'Chloe', 'Katie H', 'Asia',
                          'Daniel S', 'Alejandro', 'Melissa', 'Alice',
                          'Juara', 'Phoebe', 'Sophie I',
                          'Abigail W', 'Abby D', 'Henry', 'Zach', 'Torin',
                          'Samir', 'Rogelio', 'Avery', 'Jenna', 'Akeara',
                          'Nate', 'Nathan H', 'Erik', 'Sarah E', 'Melanie',
                          'Come', 'Daniel N', 'Shivneil', 'Mia', 'Avalyn',
                          'Karolyn', 'Logan', 'Heather', 'Charlize', 'Cleo',
                          'Chelsea', 'Eliseo', 'Bryan', 'Khamari Anthony',
                          'Remmy', 'Tianlun', 'Paola', 'Adilene', 'Yanira',
                          'Andrew', 'Daniel H', 'Alexander', 'Brandon']
        self.not_completed = self.residents.copy()
        self.done = []

    def add_person(self, person):
        '''
        Add a resident who moved in.
        '''
        self.residents.append(person)
        self.not_completed.append(person)
        num_of_residents = len(self.residents)
        return num_of_residents

    def completed_ARS(self, person):
        '''
        Mark that resident has filled out the ARS.
        '''
        self.done.append(person)
        self.not_completed.remove(person)
        return self.done

    def who_not_done(self):
        print(self.not_completed)

    def who_done(self):
        print(self.done)

    def calculate_precent(self):
        print(len(self.done) / len(self.residents))