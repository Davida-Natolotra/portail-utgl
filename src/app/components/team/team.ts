import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SocialLink {
  icon: string;
  url: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  social: SocialLink[];
}

@Component({
  selector: 'app-team',
  imports: [NgOptimizedImage],
  templateUrl: './team.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Team {
  protected readonly members: TeamMember[] = [
    {
      name: 'Walter White',
      role: 'Web Development',
      bio: 'Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut',
      photo: 'assets/img/team/team-1.jpg',
      social: [
        { icon: 'bi-twitter-x', url: '#', label: 'Twitter' },
        { icon: 'bi-facebook', url: '#', label: 'Facebook' },
        { icon: 'bi-instagram', url: '#', label: 'Instagram' },
        { icon: 'bi-linkedin', url: '#', label: 'LinkedIn' },
      ],
    },
    {
      name: 'Sarah Jhinson',
      role: 'Marketing',
      bio: 'Repellat fugiat adipisci nemo illum nesciunt voluptas repellendus. In architecto rerum rerum temporibus',
      photo: 'assets/img/team/team-2.jpg',
      social: [
        { icon: 'bi-twitter-x', url: '#', label: 'Twitter' },
        { icon: 'bi-facebook', url: '#', label: 'Facebook' },
        { icon: 'bi-instagram', url: '#', label: 'Instagram' },
        { icon: 'bi-linkedin', url: '#', label: 'LinkedIn' },
      ],
    },
    {
      name: 'William Anderson',
      role: 'Content',
      bio: 'Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara',
      photo: 'assets/img/team/team-3.jpg',
      social: [
        { icon: 'bi-twitter-x', url: '#', label: 'Twitter' },
        { icon: 'bi-facebook', url: '#', label: 'Facebook' },
        { icon: 'bi-instagram', url: '#', label: 'Instagram' },
        { icon: 'bi-linkedin', url: '#', label: 'LinkedIn' },
      ],
    },
  ];
}
