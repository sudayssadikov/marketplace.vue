<template>
  <LanguageSheet
    :compact="true"
    :show-chevron="true"
  />
</template>

<script>
import LanguageSheet from '@/components/common/LanguageSheet.vue';

export default {
  name: 'LanguageSwitcher',
  components: {
    LanguageSheet
  }
};
</script>
