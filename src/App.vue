<template>
  <div class="wrapper">
    <img class="github-logo" src="src/assets/github.png" alt="GitHub Logo" />
    <div class="categories">
      <div class="category-column-container">
        <div class="category-column" v-for="(column, index) in columns" :key="index">
          <div class="category" v-for="repo in column" :key="repo.id">
            <div class="category-title">{{ repo.name }}</div>
            <div class="category-description" :style="{ '--max-lines': repo.description ? '5' : '0' }">
              {{ repo.description }}
            </div>
            <div class="statistic">Statistiques :</div>
            <div class="category-commits">{{ repo.commits }} commits</div>
            <a :href="repo.html_url" target="_blank" class="category-link">Voir sur GitHub</a>
            <div class="button" @mouseover="hover = true" @mouseleave="hover = false" :class="{'active': hover}">
              {{ repo.language }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      repos: [],
      columns: [],
    };
  },
  mounted() {
    this.fetchRepos();
  },
  methods: {
    async fetchRepos() {
      const response = await fetch('https://api.github.com/users/Jachou-yt/repos');
      const repos = await response.json();
      console.log(repos); // Ajout d'un console.log pour vérifier si les données sont bien récupérées
      this.repos = repos.map((repo) => ({
        ...repo,
        commits: 0,
      }));
      await this.fetchCommits();
      this.splitReposIntoColumns();
    },
    async fetchCommits() {
      for (let i = 0; i < this.repos.length; i++) {
        const repo = this.repos[i];
        const response = await fetch(`https://api.github.com/repos/Jachou-yt/${repo.name}/commits`);
        const commits = await response.json();
        this.repos[i].commits = commits.length;
      }
    },
    splitReposIntoColumns() {
      const reposPerColumn = 3;
      const totalRepos = this.repos.length;
      const totalColumns = Math.ceil(totalRepos / reposPerColumn);
      const columns = Array.from({ length: totalColumns }, () => []);

      for (let i = 0; i < totalRepos; i++) {
        const columnIndex = Math.floor(i / reposPerColumn);
        columns[columnIndex].push(this.repos[i]);
      }

      this.columns = columns;
    },
  },
};
</script>

<style>
@import "assets/main.css";
@import './assets/base.css';

.statistic {
  font-weight: bold;
  text-decoration: underline;
  margin-bottom: 0.5rem;
}

.category-commits {
  margin-bottom: 1rem;
}


:root {
  --max-lines: 5;
}

.categories {
  margin-top: 4rem;
}

.category-column-container {
  column-count: 3;
  column-gap: 2rem;
}

.category-column {
  display: inline-block;
  width: 100%;
}


.category {
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: var(--color-background-soft);
  transition: opacity 0.3s ease-out;
  position: relative;
  z-index: 0;
  margin-bottom: 1rem;
}

.category:hover {
  opacity: 0.8;
}

.category-title {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-heading);
  text-transform: uppercase;
}

.category-description {
  font-size: 1.2em;
  line-height: 1.4;
  color: #333;
  margin-bottom: 20px;
}

.category-description em {
  font-style: italic;
  color: #666;
}

.no-repos-message {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-heading);
  text-align: center;
  margin-top: 2rem;
}


.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.github-logo {
  margin-top: 2rem;
  max-width: 10rem;
}
</style>